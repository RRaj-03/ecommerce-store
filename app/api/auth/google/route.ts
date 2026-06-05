import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/**
 * Initiates the Google OAuth2 Authorization Code flow.
 * Usage: /api/auth/google?from=/cart
 * The `from` param is base64-encoded into the `state` for CSRF + redirect tracking.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "/";

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Google OAuth not configured" }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
  const redirectUri = `${appUrl}/api/auth/google/callback`;

  // Encode `from` + a timestamp as state for CSRF + redirect
  const state = Buffer.from(JSON.stringify({ from, ts: Date.now() })).toString("base64url");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "select_account",
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(googleAuthUrl);
}
