"use client";
import React, { useEffect, useState } from "react";
import Button from "./ui/button";
import { ShoppingBag, User, Package, LogOut, ChevronDown, LogIn } from "lucide-react";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/hooks/useSession";
import { ThemeToggle } from "./themeToggle";

const NavbarActions = () => {
  const cart = useCart();
  const router = useRouter();
  const { session, loading, refresh } = useSession();
  const [dropOpen, setDropOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setDropOpen(false);
    // Immediately clear client-side session state so UI reverts to Sign In button
    refresh();
    router.push("/");
    router.refresh();
  };

  const initials = session.isLoggedIn
    ? `${session.firstName?.[0] ?? ""}${session.lastName?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <div className="ml-auto flex items-center gap-x-3">
      <ThemeToggle />

      {/* Auth section */}
      {!loading && (
        session.isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setDropOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted transition-colors border border-border"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold overflow-hidden flex-shrink-0">
                {session.avatar
                  ? <img src={session.avatar} alt={session.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  : (initials || <User className="w-4 h-4" />)}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {session.firstName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${dropOpen ? "rotate-180" : ""}`} />
            </button>

            {dropOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-52 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/50">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {session.firstName} {session.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{session.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/orders"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Package className="w-4 h-4 text-muted-foreground" />
                      My Orders
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      My Profile
                    </Link>
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Link>
        )
      )}

      {/* Cart button */}
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-primary px-4 py-2 hover:opacity-90 transition"
      >
        <ShoppingBag size={20} className="text-primary-foreground" />
        <span className="ml-2 text-sm font-medium text-primary-foreground">
          {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
