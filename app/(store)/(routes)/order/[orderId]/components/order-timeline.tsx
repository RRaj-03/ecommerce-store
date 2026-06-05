"use client";

import { OrderDetail } from "@/actions/getOrder";
import Currency from "@/components/ui/currency";
import Image from "next/image";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  ExternalLink,
  ShoppingBag,
  FileText,
  Printer,
} from "lucide-react";
import { format } from "date-fns";
import React from "react";

const STATUS_STEPS = [
  { key: "Ordered", label: "Ordered", icon: ShoppingBag },
  { key: "Processing", label: "Processing", icon: Package },
  { key: "Shipped", label: "Shipped", icon: Truck },
  { key: "Out for Delivery", label: "Out for Delivery", icon: MapPin },
  { key: "Delivered", label: "Delivered", icon: CheckCircle2 },
];

function getStatusIndex(status: string): number {
  if (status === "Cancelled" || status === "Refunded") return -1;
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

const OrderTimeline = ({ order }: { order: OrderDetail }) => {
  const currentIndex = getStatusIndex(order.orderStatus);
  const isCancelled =
    order.orderStatus === "Cancelled" || order.orderStatus === "Refunded";
  const legacyTotal = order.orderItems.reduce((sum, item) => {
    const price = item.priceAtTime || item.product.price;
    return sum + Number(price) * (item.quantity || 1);
  }, 0);
  
  const totalPrice = Number(order.totalAmount) > 0 ? Number(order.totalAmount) : legacyTotal;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Track Your Order</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
              <span>Order #{order.id.slice(0, 8)}</span>
              <span>•</span>
              <span>
                Placed on{" "}
                {format(new Date(order.createdAt), "MMMM do, yyyy 'at' h:mm a")}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {order.invoicePdfUrl ? (
              <a
                href={order.invoicePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Download Receipt
              </a>
            ) : (
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground border border-border rounded-xl text-sm font-medium hover:bg-muted/80 transition"
              >
                <Printer className="w-4 h-4" />
                Print Order
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Progress */}
      {!isCancelled ? (
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            {STATUS_STEPS.map((step, index) => {
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex;
              const Icon = step.icon;

              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCurrent
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-medium text-center max-w-[60px] sm:max-w-[80px] ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < STATUS_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full transition-colors duration-500 ${
                        index < currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold text-destructive">
            Order {order.orderStatus}
          </p>
        </div>
      )}

      {/* Tracking + Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tracking Details */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Shipment Details
          </h2>
          {order.trackingNumber ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Carrier</p>
                <p className="font-medium text-foreground">
                  {order.carrier || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tracking Number</p>
                <p className="font-medium text-foreground font-mono">
                  {order.trackingNumber}
                </p>
              </div>
              {order.trackingUrl && (
                <a
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  Track on carrier website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {order.estimatedDelivery && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Estimated Delivery
                  </p>
                  <p className="font-medium text-foreground">
                    {format(
                      new Date(order.estimatedDelivery),
                      "MMMM do, yyyy"
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tracking details will appear here once your order is shipped.
            </p>
          )}
        </div>

        {/* Payment Info */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Method</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {order.paymentMethod || "Stripe"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={`text-sm font-medium ${
                  order.isPaid ? "text-green-600 dark:text-green-400" : "text-destructive"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
            {order.transactionId && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Transaction
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {order.transactionId.slice(0, 16)}...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-lg text-foreground">Order Items</h2>
        <div className="divide-y divide-border">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {item.product.images?.[0] && (
                  <Image
                    fill
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {item.product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity || 1}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  <Currency
                    value={String(
                      Number(item.priceAtTime || item.product.price) *
                        (item.quantity || 1)
                    )}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {Number(order.taxAmount) > 0 && (
          <div className="flex justify-between pt-3 text-muted-foreground">
            <span>Tax</span>
            <span>
              <Currency value={String(order.taxAmount)} />
            </span>
          </div>
        )}
        
        <div className="flex justify-between pt-4 border-t border-border mt-3">
          <span className="font-semibold text-foreground">Total</span>
          <span className="font-bold text-lg text-foreground">
            <Currency value={String(totalPrice)} />
          </span>
        </div>
      </div>

      {/* Status History */}
      {order.statusHistory && order.statusHistory.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Status History
          </h2>
          <div className="space-y-0">
            {order.statusHistory.map((entry, index) => (
              <div key={entry.id} className="flex gap-4 relative">
                {/* Timeline line */}
                {index < order.statusHistory.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-0.5 h-[calc(100%)] bg-border" />
                )}
                <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 z-10 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="pb-6 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {entry.status}
                  </p>
                  {entry.note && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {entry.note}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(
                      new Date(entry.createdAt),
                      "MMM do, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
