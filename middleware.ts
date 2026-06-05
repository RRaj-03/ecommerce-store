import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStoreId } from "./lib/storeId";

// Routes that require a logged-in customer
const PROTECTED_PATHS = ["/orders", "/profile"];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const storeId = getStoreId();

  // Skip static files, Next internals, API routes, auth pages
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  ) {
    return NextResponse.next();
  }

  // Protect customer-only routes
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    const expectedCookieName = `store_auth_session_${storeId}`;
    const sessionCookie = request.cookies.get(expectedCookieName);
    
    if (!sessionCookie) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
