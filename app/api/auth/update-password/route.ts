import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAdminAuthUrl } from "@/lib/storeId";

/**
 * Store update-password proxy.
 * Reads userId from session, forwards to admin backend.
 */
export async function POST(req: Request) {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const adminUrl = getAdminAuthUrl();

    // Forward to admin backend with userId from session
    const backendRes = await fetch(`${adminUrl}/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, userId: session.userId }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, { status: backendRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[STORE_UPDATE_PASSWORD_PROXY]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
