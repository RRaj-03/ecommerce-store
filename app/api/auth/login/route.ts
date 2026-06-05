import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getStoreId, getAdminAuthUrl } from "@/lib/storeId";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

/**
 * Store login proxy.
 * 1. Forward credentials to admin backend
 * 2. On success, set iron-session cookie with returned customer data
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const adminUrl = getAdminAuthUrl();
    const storeId = getStoreId();

    // Forward to admin backend
    const backendRes = await fetch(`${adminUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, {
        status: backendRes.status,
        headers: corsHeader,
      });
    }

    // Set session cookie on the store's domain
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );
    session.userId = data.id;
    session.firstName = data.firstName;
    session.lastName = data.lastName;
    session.email = data.email;
    session.phone = data.phone;
    session.avatar = data.avatar ?? undefined;
    session.storeId = data.storeId;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json(data, { headers: corsHeader });
  } catch (error) {
    console.error("[STORE_LOGIN_PROXY]", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500, headers: corsHeader },
    );
  }
}
