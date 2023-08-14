"use client";
import React, { useEffect, useRef, useState } from "react";

import fs from "fs";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Keyboard, Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Image as ImageType } from "@/types";

export default function Carousel({ images }: { images: ImageType[] }) {
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        // navigation={true}
        modules={[Keyboard, Autoplay, Pagination, Navigation]}
        className="mySwiper h-[400px] w-full !hidden sm:!block"
      >
        {images.map((img) => {
          return (
            <SwiperSlide className="object-cover object-center">
              <Image
                width={1920}
                height={800}
                className="w-full  object-center h-full object-cover"
                src={img.url}
                alt={"Image"}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
