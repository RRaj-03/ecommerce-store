import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { getStoreId } from "@/lib/storeId";

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const storeId = getStoreId();
  // Validate session belongs to THIS store
  if (!session.isLoggedIn || session.storeId !== storeId) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({
    isLoggedIn: true,
    userId: session.userId,
    firstName: session.firstName,
    lastName: session.lastName,
    email: session.email,
    phone: session.phone,
    avatar: session.avatar,
    storeId: session.storeId,
  });
}
