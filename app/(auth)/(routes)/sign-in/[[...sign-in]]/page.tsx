"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2, ShoppingBag, AlertCircle } from "lucide-react";

// Google SVG icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const ERROR_MESSAGES: Record<string, string> = {
  google_denied: "Google sign-in was cancelled.",
  invalid_callback: "Invalid OAuth callback. Please try again.",
  token_exchange: "Failed to authenticate with Google. Please try again.",
  state_expired: "Sign-in session expired. Please try again.",
  email_not_verified: "Your Google account email is not verified.",
  server_error: "Something went wrong. Please try again.",
};

export default function StoreSignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [storeName, setStoreName] = useState("Our Store");
  const [storeLogo, setStoreLogo] = useState("");

  useEffect(() => {
    const meta = document.getElementById("store-meta");
    if (meta) {
      setStoreName(meta.dataset.name || "Our Store");
      setStoreLogo(meta.dataset.logo || "");
    }
    // Show OAuth error from callback redirect
    const oauthError = searchParams.get("error");
    if (oauthError) setError(ERROR_MESSAGES[oauthError] || "Authentication failed.");
  }, [searchParams]);

  const from = searchParams.get("from") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    window.location.href = `/api/auth/google?from=${encodeURIComponent(from)}`;
  };

  const isRequired = from === "/orders" || from === "/profile" || from === "/cart";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-5/12 relative overflow-hidden items-center justify-center p-12"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 text-center space-y-6 max-w-xs">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto shadow-2xl overflow-hidden relative">
            {storeLogo
              ? <Image src={storeLogo} alt={storeName} fill className="object-cover" />
              : <ShoppingBag className="w-12 h-12 text-white" />}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{storeName}</h1>
            <p className="text-white/75 text-lg leading-relaxed">
              {isRequired
                ? "Sign in to complete your purchase and track your order."
                : "Sign in to track orders, save favourites and check out faster."}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["Track Orders", "Saved Items", "Fast Checkout"].map((label) => (
              <span key={label} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary flex items-center justify-center flex-shrink-0 relative">
              {storeLogo
                ? <Image src={storeLogo} alt={storeName} width={40} height={40} className="object-cover" />
                : <ShoppingBag className="w-5 h-5 text-primary-foreground" />}
            </div>
            <span className="font-bold text-lg text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{storeName}</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {isRequired ? "Sign in to continue" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground mt-1">
              New here?{" "}
              <Link href={`/sign-up${from !== "/" ? `?from=${encodeURIComponent(from)}` : ""}`} className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 text-destructive text-sm px-4 py-3 rounded-xl">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* ─── Google OAuth ─── */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-background border border-border hover:bg-muted text-foreground font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
            <span>{googleLoading ? "Redirecting to Google…" : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="email">Email address</label>
              <input
                id="email" type="email" autoComplete="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password" type={showPass ? "text" : "password"} autoComplete="current-password"
                  required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : "Sign In"}
            </button>
          </form>

          {/* Skip — only shown for non-required routes */}
          {!isRequired && (
            <div className="text-center border-t border-border pt-5">
              <p className="text-sm text-muted-foreground mb-2">Just browsing?</p>
              <Link href={from} className="text-sm font-medium text-foreground hover:text-primary transition-colors underline underline-offset-2">
                Continue without signing in →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
