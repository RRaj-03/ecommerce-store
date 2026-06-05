"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";
import { User, Package, LogOut, ChevronDown } from "lucide-react";

const UserProfileButton = () => {
  const { session, loading } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (loading) return null;
  if (!session.isLoggedIn) {
    return (
      <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Sign In
      </Link>
    );
  }

  const initials = `${session.firstName?.[0] ?? ""}${session.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted transition-colors border border-border"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          {initials || <User className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium text-foreground hidden sm:block">{session.firstName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-52 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/50">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-sm font-semibold text-foreground">{session.firstName} {session.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{session.email}</p>
            </div>
            <div className="py-1">
              <Link href="/orders" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                <Package className="w-4 h-4 text-muted-foreground" /> My Orders
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                <User className="w-4 h-4 text-muted-foreground" /> My Profile
              </Link>
              <div className="border-t border-border mt-1 pt-1">
                <button onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileButton;
