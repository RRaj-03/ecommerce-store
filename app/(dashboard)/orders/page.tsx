"use client";
import React, { useEffect, useState } from "react";
import Contanier from "@/components/ui/contanier";
import Link from "next/link";
import Image from "next/image";
import Currency from "@/components/ui/currency";
import {
  Package,
  ShoppingBag,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import getOrders from "@/actions/getOrders";
import { Order } from "@/types";

const STATUS_COLOR: Record<string, string> = {
  Ordered: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950",
  Processing:
    "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950",
  Shipped:
    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950",
  "Out for Delivery":
    "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950",
  Delivered: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950",
  Cancelled: "text-destructive bg-destructive/10",
  Refunded: "text-destructive bg-destructive/10",
};

const STATUS_ICON: Record<string, React.FC<{ className?: string }>> = {
  Ordered: ShoppingBag,
  Processing: Package,
  Shipped: Truck,
  "Out for Delivery": Truck,
  Delivered: CheckCircle2,
  Cancelled: AlertCircle,
  Refunded: AlertCircle,
};

const OrdersPage = () => {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!sessionLoading && !session.isLoggedIn) {
      router.replace("/sign-in?from=/orders");
    }
  }, [sessionLoading, session.isLoggedIn, router]);

  useEffect(() => {
    if (sessionLoading) return;
    if (!session.isLoggedIn || !session.userId) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;
    setLoading(true);
    getOrders(session.userId)
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load orders.");
        setLoading(false);
      });
  }, [session.isLoggedIn, session.userId, sessionLoading]);

  return (
    <div className="bg-background min-h-screen">
      <Contanier>
        <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all your purchases
            </p>
          </div>

          {(loading || sessionLoading) && (
            <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading your orders…</span>
            </div>
          )}

          {!loading && !sessionLoading && error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-8 text-center">
              <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}

          {!loading && !sessionLoading && !error && orders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground text-lg">
                  No orders yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your order history will appear here.
                </p>
              </div>
              <Link
                href="/"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {!loading && !sessionLoading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const legacyTotal = order.orderItems.reduce((sum, item) => {
                  return (
                    sum +
                    Number(item.priceAtTime || item.product.price) *
                      (item.quantity || 1)
                  );
                }, 0);
                
                const total = Number(order.totalAmount) > 0 ? Number(order.totalAmount) : legacyTotal;
                const StatusIcon = STATUS_ICON[order.orderStatus] || Clock;
                const statusClass =
                  STATUS_COLOR[order.orderStatus] ||
                  "text-muted-foreground bg-muted";
                const previewImages = order.orderItems
                  .slice(0, 3)
                  .map((i) => i.product.images?.[0]?.url)
                  .filter(Boolean) as string[];

                return (
                  <Link
                    key={order.id}
                    href={`/order/${order.id}`}
                    className="group block bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex -space-x-3 flex-shrink-0">
                          {previewImages.map((url, i) => (
                            <div
                              key={i}
                              className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-background bg-muted"
                              style={{ zIndex: previewImages.length - i }}
                            >
                              <Image
                                src={url}
                                alt="Product"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.orderItems.length > 3 && (
                            <div
                              className="w-14 h-14 rounded-xl border-2 border-background bg-muted flex items-center justify-center"
                              style={{ zIndex: 0 }}
                            >
                              <span className="text-xs font-bold text-muted-foreground">
                                +{order.orderItems.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {order.orderItems.length}{" "}
                            {order.orderItems.length === 1 ? "item" : "items"} ·{" "}
                            {format(new Date(order.createdAt), "dd MMM yyyy")}
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-1">
                            <Currency value={String(total)} />
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusClass}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {order.orderStatus}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground truncate max-w-[60%]">
                        {order.orderItems.map((i) => i.product.name).join(", ")}
                      </p>
                      
                      {order.invoicePdfUrl && (
                        <a 
                          href={order.invoicePdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Receipt
                        </a>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </Contanier>
    </div>
  );
};

export default OrdersPage;
