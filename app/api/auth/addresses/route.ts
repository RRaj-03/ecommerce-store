import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getAdminAuthUrl } from "@/lib/storeId";

export async function GET() {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiUrl = getAdminAuthUrl();
    const backendRes = await fetch(`${apiUrl}/addresses?userId=${session.userId}`);
    
    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      return NextResponse.json({ error: errorText }, { status: backendRes.status });
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[STORE_ADDRESSES_GET]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const apiUrl = getAdminAuthUrl();

    const backendRes = await fetch(`${apiUrl}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, userId: session.userId }),
    });
    
    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      return NextResponse.json({ error: errorText }, { status: backendRes.status });
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[STORE_ADDRESSES_POST]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
