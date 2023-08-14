import React from "react";
import { Billboard as BillboardTypes } from "@/types";
const Billboard = ({ data }: { data: BillboardTypes }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
      <div className="rounded-xl aspect-square relative md:aspect-[2.4/1] overflow-hidden bg-cover bg-center ">
        <div
          className="h-full w-full flex flex-col items-center justify-center text-center gap-y-8 rounded-xl aspect-square absolute md:aspect-[2.4/1] overflow-hidden bg-cover bg-center blur-[2.5px]"
          style={{ backgroundImage: `url(${data.imageURL})` }}
        ></div>
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-y-8 ">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs z-[1] text-gray-100">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
