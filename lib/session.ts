import type { SessionOptions } from "iron-session";
import { getStoreId } from "./storeId";

export interface SessionData {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  storeId?: string;  // stored in session so we can validate on reads
  isLoggedIn: boolean;
}

/**
 * Cookie name is scoped to the storeId so different store deployments
 * served on different subdomains/domains never share sessions,
 * and even during local development on the same port, they won't conflict.
 */
const storeId = getStoreId();

export const sessionOptions: SessionOptions = {
  cookieName: `store_auth_session_${storeId}`,
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
