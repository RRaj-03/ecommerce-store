"use client";
import React, { useEffect, useState } from "react";
import Contanier from "@/components/ui/contanier";
import { useSession } from "@/hooks/useSession";
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  MapPin,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AddressManager from "@/components/addressManager";

const ProfilePage = () => {
  const { session, loading: sessionLoading, refresh } = useSession();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (session.isLoggedIn) {
      setForm({
        firstName: session.firstName || "",
        lastName: session.lastName || "",
        email: session.email || "",
        phone: session.phone || "",
      });
    }
  }, [session]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update profile");
        return;
      }
      toast.success("Profile updated!");
      refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (pwForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSavingPw(true);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwForm.currentPassword,
          newPassword: pwForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update password");
        return;
      }
      toast.success("Password changed!");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSavingPw(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const initials =
    `${form.firstName?.[0] ?? ""}${form.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="bg-background min-h-screen py-10">
      <Contanier>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
              {initials || <User className="w-8 h-8" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {form.firstName} {form.lastName}
              </h1>
              <p className="text-muted-foreground">{form.email}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Personal Information
            </h2>
            <form onSubmit={saveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Phone className="w-4 h-4" /> Phone{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {savingProfile ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {savingProfile ? "Saving…" : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Change Password
            </h2>
            <form onSubmit={savePassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    required
                    value={pwForm.currentPassword}
                    onChange={(e) =>
                      setPwForm((f) => ({
                        ...f,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showCurrent ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    minLength={8}
                    value={pwForm.newPassword}
                    onChange={(e) =>
                      setPwForm((f) => ({ ...f, newPassword: e.target.value }))
                    }
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={pwForm.confirmPassword}
                  onChange={(e) =>
                    setPwForm((f) => ({
                      ...f,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 transition ${
                    pwForm.confirmPassword &&
                    pwForm.confirmPassword !== pwForm.newPassword
                      ? "border-destructive focus:ring-destructive/40"
                      : "border-border focus:ring-primary/40 focus:border-primary"
                  }`}
                />
                {pwForm.confirmPassword &&
                  pwForm.confirmPassword === pwForm.newPassword && (
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                    </p>
                  )}
              </div>

              <button
                type="submit"
                disabled={savingPw}
                className="flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl font-semibold hover:opacity-80 transition disabled:opacity-60"
              >
                {savingPw ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {savingPw ? "Updating…" : "Update Password"}
              </button>
            </form>
            {/* Address Management */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Saved Addresses
              </h2>
              <AddressManager />
            </div>
          </div>
        </div>
      </Contanier>
    </div>
  );
};

export default ProfilePage;
