"use client";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { useSession } from "@/hooks/useSession";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CreditCard, Smartphone, Truck, Loader2, LogIn, MapPin } from "lucide-react";
import CheckoutAuthModal from "@/components/checkoutAuthModal";
import AddressManager, { Address } from "@/components/addressManager";

interface PaymentConfig {
  stripeEnabled: boolean;
  phonepeEnabled: boolean;
  codEnabled: boolean;
  codMinOrder?: number;
  codMaxOrder?: number;
  currency?: string;
  taxRate?: number;
}

const PAYMENT_LABELS = {
  stripe: { label: "Card / Online", icon: CreditCard, color: "text-blue-600 dark:text-blue-400" },
  phonepe: { label: "PhonePe / UPI", icon: Smartphone, color: "text-purple-600 dark:text-purple-400" },
  cod: { label: "Cash on Delivery", icon: Truck, color: "text-green-600 dark:text-green-400" },
} as const;

type PaymentMethod = keyof typeof PAYMENT_LABELS;

const Summary = () => {
  const router = useRouter();
  const { session, loading: sessionLoading, refresh: refreshSession } = useSession();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    stripeEnabled: true,
    phonepeEnabled: false,
    codEnabled: false,
  });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;
    fetch(`${apiUrl}/payment-config`)
      .then((r) => r.json())
      .then((cfg: PaymentConfig) => {
        setPaymentConfig(cfg);
        if (cfg.stripeEnabled) setSelectedMethod("stripe");
        else if (cfg.phonepeEnabled) setSelectedMethod("phonepe");
        else if (cfg.codEnabled) setSelectedMethod("cod");
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (searchParams.get("success")) { toast.success("Payment completed."); removeAll(); }
    if (searchParams.get("canceled")) { toast.error("Something went wrong."); }
    if (searchParams.get("cod_success")) { toast.success("Order placed! Pay on delivery."); removeAll(); }
  }, [removeAll, searchParams]);

  const doCheckout = async () => {
    if (items.length === 0) return;

    if (selectedMethod === "cod") {
      const min = paymentConfig.codMinOrder ?? 0;
      const max = paymentConfig.codMaxOrder ?? Infinity;
      if (totalPrice < min) { toast.error(`Minimum order for COD is ₹${min}`); return; }
      if (totalPrice > max) { toast.error(`Maximum order for COD is ₹${max}`); return; }
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    try {
      setLoading(true);
      // Re-read session in case it was just set by modal login
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json();

      const productIds = items.flatMap((item) => Array(item.quantity).fill(item.product.id));
      const formattedAddress = `${selectedAddress.name}: ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.pincode}, ${selectedAddress.country}`;

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds,
        paymentMethod: selectedMethod,
        user: {
          userId: me.userId,
          firstName: me.firstName,
          lastName: me.lastName,
          fullName: `${me.firstName} ${me.lastName}`,
          phoneNumber: me.phone,
          emailAddress: me.email,
        },
        address: formattedAddress,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.orderId) {
        router.push(`/order/${response.data.orderId}?cod_success=1`);
      }
    } catch (error: any) {
      toast.error(String(error?.response?.data || error?.message || "Checkout failed"));
    } finally {
      setLoading(false);
    }
  };

  const onCheckout = () => {
    if (items.length === 0) return;
    if (!session.isLoggedIn) {
      // Show inline modal — cart stays visible in background
      setShowAuthModal(true);
      return;
    }
    doCheckout();
  };

  // Called by modal after successful login
  const onAuthSuccess = () => {
    setShowAuthModal(false);
    refreshSession();
    toast("Please select a delivery address to continue.", { icon: "📍" });
  };

  const availableMethods = (
    Object.entries(PAYMENT_LABELS) as [PaymentMethod, (typeof PAYMENT_LABELS)[PaymentMethod]][]
  ).filter(([method]) => paymentConfig[`${method}Enabled` as keyof PaymentConfig]);

  const taxRate = paymentConfig.taxRate ? Number(paymentConfig.taxRate) : 0;
  const taxAmount = (totalPrice * taxRate) / 100;
  const grandTotal = totalPrice + taxAmount;

  return (
    <>
      <div className="mt-16 rounded-2xl bg-card border border-border px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 space-y-6">
        <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <Currency value={totalPrice} />
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Tax ({taxRate}%)</span>
              <Currency value={taxAmount} />
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border pt-3 font-semibold text-foreground">
            <span>Total</span>
            <Currency value={grandTotal} />
          </div>
        </div>

        {availableMethods.length >= 1 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Payment Method</p>
            <div className="space-y-2">
              {availableMethods.map(([method, meta]) => {
                const Icon = meta.icon;
                return (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                      selectedMethod === method ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${meta.color}`} />
                    <span className="text-foreground font-medium">{meta.label}</span>
                    {selectedMethod === method && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
            {availableMethods.length === 1 && selectedMethod === "cod" && (
              <p className="text-xs text-muted-foreground pt-1 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                Pay in cash when your order arrives at your door.
              </p>
            )}
          </div>
        )}

        {/* Address Selection (Visible only if logged in) */}
        {session.isLoggedIn && !sessionLoading && (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-sm font-medium text-foreground">Delivery Address</p>
            <AddressManager 
              selectable 
              selectedId={selectedAddress?.id} 
              onSelect={setSelectedAddress} 
            />
          </div>
        )}

        {/* Checkout CTA — same button whether logged in or not */}
        <Button
          disabled={items.length === 0 || loading || sessionLoading || (session.isLoggedIn && !selectedAddress)}
          className="w-full"
          onClick={onCheckout}
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
          ) : !session.isLoggedIn && !sessionLoading ? (
            <><LogIn className="w-4 h-4 mr-2" /> Sign In to Checkout</>
          ) : (
            "Checkout"
          )}
        </Button>

        {!session.isLoggedIn && !sessionLoading && (
          <p className="text-xs text-center text-muted-foreground -mt-2">
            You&apos;ll be asked to sign in or create an account.
          </p>
        )}
      </div>

      {/* Inline auth modal — cart stays visible in background */}
      {showAuthModal && (
        <CheckoutAuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={onAuthSuccess}
        />
      )}
    </>
  );
};

export default Summary;
