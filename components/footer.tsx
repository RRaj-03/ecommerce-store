import React from "react";
import Contanier from "./ui/contanier";
import { Store } from "@/types";

const Footer = ({ store }: { store: Store }) => {
  return (
    <footer className="bg-background border-t">
      <section className="text-muted-foreground body-font relative max-w-md p-4 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-6xl xl:max-w-[90rem]">
        <div className="mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 sm:w-1/2 w-full my-8 sm:my-0 h-[300px] sm:h-auto bg-muted rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0 grayscale contrast-100 opacity-60 hover:opacity-100 transition duration-300 mix-blend-multiply dark:mix-blend-normal dark:invert-[.9]"
              title="map"
              src={`https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${store.Address}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
            ></iframe>
          </div>
          <div className="lg:w-1/3 sm:w-1/2 flex flex-col w-full">
            <div className="bg-card border relative h-full flex flex-wrap flex-col gap-4 py-6 rounded shadow-md justify-around">
              <div className=" px-6">
                <h2 className="title-font font-semibold text-foreground tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1 text-muted-foreground">{store.Address}.</p>
              </div>

              <div className=" px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-foreground tracking-widest text-xs">
                  EMAIL
                </h2>
                <p className="text-primary leading-relaxed">
                  {store.emailAddress}
                </p>
              </div>
              <div className=" px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-foreground tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed flex flex-wrap text-muted-foreground">
                  <a href={"tel:+91" + store.phoneNumber}>
                    +91 {store.phoneNumber}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto py-10">
        <div className="text-center text-lg text-foreground">
          &copy; 2023 Store, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
