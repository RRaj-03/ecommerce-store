"use client";
import { Product } from "@/types";
import React from "react";
import Currency from "./ui/currency";
import { ShoppingCart, Package, Truck, Shield } from "lucide-react";
import Button from "./ui/button";
import StockChecker from "./stock-checker";
import useCart from "@/hooks/useCart";

const Info = ({ data }: { data: Product }) => {
  const cart = useCart();

  const hasDiscount =
    data.compareAtPrice &&
    Number(data.compareAtPrice) > Number(data.price);

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(data.compareAtPrice) - Number(data.price)) /
          Number(data.compareAtPrice)) *
          100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{data.name}</h1>
        {data.sku && (
          <p className="text-sm text-muted-foreground mt-1">SKU: {data.sku}</p>
        )}
      </div>

      {/* Price Section */}
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-foreground">
          <Currency value={data.price} />
        </p>
        {hasDiscount && (
          <>
            <p className="text-xl text-muted-foreground line-through">
              <Currency value={data.compareAtPrice!} />
            </p>
            <span className="text-sm font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      <hr className="border-border" />

      {/* Description */}
      {data.description && (
        <div>
          <h3 className="font-semibold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>
      )}

      {/* Filter Items (Color, Material, etc.) */}
      <div className="flex flex-col gap-y-4">
        {data.filterItems.map((filter) => (
          <div className="flex items-center gap-x-4" key={filter.filterItem.id}>
            <h3 className="font-semibold text-foreground">
              {filter.filterItem.filter.name}:
            </h3>
            <div className="flex items-center gap-2">
              {filter.filterItem.filter.name.toLowerCase() === "color" && (
                <span
                  className="w-5 h-5 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: filter.filterItem.value }}
                />
              )}
              <span className="text-muted-foreground">
                {filter.filterItem.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-2">Tags</h3>
          <div className="flex gap-2 flex-wrap">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stock status */}
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-muted-foreground" />
        {data.inventory > 0 ? (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            In Stock ({data.inventory} available)
          </span>
        ) : (
          <span className="text-sm text-destructive font-medium">
            Out of Stock
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <div className="flex items-center gap-x-3">
        <Button
          className="flex items-center gap-x-2 px-8 py-3 text-base"
          disabled={data.inventory === 0}
          onClick={() => cart.addItem(data)}
        >
          Add To Cart
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck className="w-4 h-4" />
          <span>Free shipping over ₹999</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Secure checkout</span>
        </div>
      </div>

      <StockChecker />
    </div>
  );
};

export default Info;
