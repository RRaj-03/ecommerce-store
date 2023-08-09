import React from "react";
import { Billboard as BillboardTypes } from "@/types";
const Billboard = ({ data }: { data: BillboardTypes }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
      <div
        className="rounded-xl aspect-square relative md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${data.imageURL})` }}
      >
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
