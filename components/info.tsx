import { Product } from "@/types";
import React from "react";
import Currency from "./ui/currency";
import { ShoppingCart } from "lucide-react";
import Button from "./ui/button";

const Info = ({ data }: { data: Product }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name} </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        {data.filterItems.map((filter) => (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">
              {filter.filterItem.filter.name}:
            </h3>
            <div>{filter?.filterItem?.value}</div>
          </div>
        ))}
        <div className="mt-10 flex items-center gap-x-3">
          <Button className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
