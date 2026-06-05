import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getStoreId, getAdminAuthUrl } from "@/lib/storeId";

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  picture: string;
  name: string;
}

/**
 * Google OAuth2 callback — store still handles the OAuth token exchange
 * (needs GOOGLE_CLIENT_ID/SECRET), but delegates the DB find-or-create
 * to the admin backend.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
  const storeId = getStoreId();
  const adminUrl = getAdminAuthUrl();

  if (error) {
    return NextResponse.redirect(`${appUrl}/sign-in?error=google_denied`);
  }
  if (!code || !state) {
    return NextResponse.redirect(`${appUrl}/sign-in?error=invalid_callback`);
  }

  let from = "/";
  try {
    const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf-8"));
    from = decoded.from || "/";
    if (Date.now() - decoded.ts > 10 * 60 * 1000) {
      return NextResponse.redirect(`${appUrl}/sign-in?error=state_expired`);
    }
  } catch {
    return NextResponse.redirect(`${appUrl}/sign-in?error=invalid_state`);
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    // 1. Exchange code for tokens (this is between store and Google — no DB needed)
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code, client_id: clientId, client_secret: clientSecret,
        redirect_uri: redirectUri, grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("[GOOGLE_CALLBACK] Token exchange failed:", await tokenRes.text());
      return NextResponse.redirect(`${appUrl}/sign-in?error=token_exchange`);
    }

    const tokens: GoogleTokenResponse = await tokenRes.json();

    // 2. Fetch Google user info
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!userRes.ok) return NextResponse.redirect(`${appUrl}/sign-in?error=user_fetch`);

    const googleUser: GoogleUserInfo = await userRes.json();
    if (!googleUser.verified_email) {
      return NextResponse.redirect(`${appUrl}/sign-in?error=email_not_verified`);
    }

    // 3. Delegate DB find-or-create to admin backend
    const backendRes = await fetch(`${adminUrl}/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        googleId: googleUser.id,
        email: googleUser.email,
        firstName: googleUser.given_name || googleUser.name.split(" ")[0],
        lastName: googleUser.family_name || googleUser.name.split(" ").slice(1).join(" ") || "",
        avatar: googleUser.picture,
      }),
    });

    if (!backendRes.ok) {
      console.error("[GOOGLE_CALLBACK] Backend error:", await backendRes.text());
      return NextResponse.redirect(`${appUrl}/sign-in?error=server_error`);
    }

    const customer = await backendRes.json();

    // 4. Set session cookie on the store's domain
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.userId = customer.id;
    session.firstName = customer.firstName;
    session.lastName = customer.lastName;
    session.email = customer.email;
    session.phone = customer.phone;
    session.avatar = customer.avatar ?? undefined;
    session.storeId = storeId;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.redirect(`${appUrl}${from}`);
  } catch (err) {
    console.error("[GOOGLE_CALLBACK]", err);
    return NextResponse.redirect(`${appUrl}/sign-in?error=server_error`);
  }
}
