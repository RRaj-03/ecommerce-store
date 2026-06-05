import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "./session";

/**
 * Server-side auth helper for Store.
 * Reads the encrypted session cookie and returns customer info.
 */
export async function auth(): Promise<{ userId: string | null; session: SessionData }> {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn || !session.userId) {
    return { userId: null, session: defaultSession };
  }
  return { userId: session.userId, session };
}
