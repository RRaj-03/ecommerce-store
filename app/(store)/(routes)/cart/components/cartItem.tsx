"use client";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/iconButton";
import useCart from "@/hooks/useCart";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = ({ data }: { data: Product }) => {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data.id);
  };
  return (
    <li className="flex border-b py-6">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          src={data.images[0].url}
          fill
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col gap-y-4 sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="font-semibold text-black text-lg">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500 gap-x-4 flex items-center justify-between">
              <span>{data.color.name}</span>
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: data.color.value }}
              />
            </p>
            <p className="text-gray-500 ml-4 pl-4 border-l border-gray-200">
              {data.size.name}
            </p>
          </div>
          <Currency value={data.price} />
        </div>
        <div>
          {data.filterItems.map((item) => (
            <p className="flex items-center gap-x-4">
              <span className="font-medium">
                {item.filterItem.filter.name}:
              </span>
              <span className="text-gray-500 ">{item.filterItem.value}</span>
            </p>
          ))}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
