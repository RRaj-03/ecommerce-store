import { Image as ImageType } from "@/types";
import React from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const GalleryTab = ({ image }: { image: ImageType }) => {
  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer rounded-md bg-white items-center justify-center"
      }
    >
      {({ selected }) => (
        <div>
          <span className="overflow-hidden rounded-md absolute h-full w-full inset-0 ">
            <Image
              fill
              src={image.url}
              alt="Image"
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent "
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
