"use client";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/iconButton";
import useCart, { CartItem as CartItemType } from "@/hooks/useCart";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ data }: { data: CartItemType }) => {
  const cart = useCart();
  const { product, quantity } = data;

  return (
    <li className="flex border-b border-border py-6">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 flex-shrink-0">
        <Image
          src={product.images[0].url}
          fill
          alt={product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col gap-y-4 sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton
            onClick={() => cart.removeItem(product.id)}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="font-semibold text-lg text-foreground">{product.name}</p>
          </div>
          <div className="text-foreground">
            <Currency value={Number(product.price) * quantity} />
          </div>
        </div>
        {/* Attributes */}
        <div>
          {product.filterItems?.map((item) => (
            <p className="flex items-center gap-x-4" key={item.filterItem.id}>
              <span className="font-medium text-foreground">
                {item.filterItem.filter.name}:
              </span>
              <span className="text-muted-foreground">
                {item.filterItem.value}
              </span>
            </p>
          ))}
        </div>
        {/* Quantity Controls */}
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => cart.decreaseQuantity(product.id)}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-medium text-foreground w-5 text-center">
            {quantity}
          </span>
          <button
            onClick={() => cart.increaseQuantity(product.id)}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition"
          >
            <Plus size={12} />
          </button>
          {quantity > 1 && (
            <span className="text-xs text-muted-foreground ml-1">
              × <Currency value={product.price} /> each
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
