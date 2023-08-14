import React from "react";
import Contanier from "./ui/contanier";
import { Store } from "@/types";

const Footer = ({ store }: { store: Store }) => {
  return (
    <footer className="bg-gray-700 border-t pt-4 sm:pt-10">
      <section className="text-gray-600 body-font relative max-w-md p-4 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-6xl xl:max-w-[90rem]">
        <div className="mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 sm:w-1/2 w-full my-8 sm:my-0 h-[300px] sm:h-auto bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              src={`https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${store.Address}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
            ></iframe>
          </div>
          <div className="lg:w-1/3 sm:w-1/2 flex flex-col w-full">
            <div className="bg-white relative h-full flex flex-wrap flex-col gap-4 py-6 rounded shadow-md justify-around">
              <div className=" px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">{store.Address}.</p>
              </div>

              <div className=" px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <p className="text-indigo-500 leading-relaxed">
                  {store.emailAddress}
                </p>
              </div>
              <div className=" px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed flex flex-wrap">
                  <a href={"tel:+91" + store.phoneNumber}>
                    +91 {store.phoneNumber}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-6 text-white" />
      </section>

      <div className="mx-auto py-10">
        <div className="text-center text-lg text-gray-400">
          &copy; 2023 Store, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
