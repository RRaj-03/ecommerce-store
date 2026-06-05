"use client";
import { useEffect, useState } from "react";

export interface StoreSession {
  isLoggedIn: boolean;
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

/**
 * Client-side hook to read the current store session from /api/auth/me.
 * Replaces Clerk's useUser().
 */
export function useSession() {
  const [session, setSession] = useState<StoreSession>({ isLoggedIn: false });
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => { setSession(data); setLoading(false); })
      .catch(() => { setSession({ isLoggedIn: false }); setLoading(false); });
  };

  useEffect(() => { refresh(); }, []);

  return { session, loading, refresh };
}
