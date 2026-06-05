"use client";
import { Product } from "@/types";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import IconButton from "./iconButton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

const ProductCard = ({ data }: { data: Product }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

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
    <div
      onClick={handleClick}
      className="bg-card group cursor-pointer rounded-xl border border-border/50 space-y-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
    >
      {/* Image Container */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt={data.name}
          className="aspect-square object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Out of Stock Badge */}
        {data.inventory === 0 && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-muted text-muted-foreground text-sm font-semibold px-4 py-2 rounded-full border">
              Out of Stock
            </span>
          </div>
        )}

        {/* Action Buttons - appear on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute w-full px-6 bottom-5 translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-x-4 justify-center">
            <IconButton
              icon={<Expand size={18} className="text-foreground" />}
              onClick={onPreview}
            />
            <IconButton
              icon={<ShoppingCart size={18} className="text-foreground" />}
              onClick={onAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 space-y-2">
        <div>
          <p className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {data.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data?.category?.name}
          </p>
        </div>

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {data.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            <Currency value={data?.price} />
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              <Currency value={data.compareAtPrice!} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
