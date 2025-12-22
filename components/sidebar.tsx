"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { Montserrat } from "next/font/google"; // Disabled to avoid build timeout
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ShoppingCart, UserCog } from "lucide-react";
import getStores from "@/actions/getStore";

// const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const montserrat = { className: "font-sans" };
const routes = [
  {
    label: "Profile Dashboard",
    icon: UserCog,
    href: "/profile",
    color: "text-sky-500",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/orders",
    color: "text-violet-700",
  },
];
const Sidebar = ({ name }: { name: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1 ">
        <div
          className="mb-6 cursor-pointer p-1"
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeftIcon />
        </div>
        <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image fill alt="Logo" src={"/logo.png"} />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            {name}
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((ele) => {
            return (
              <Link
                href={ele.href}
                key={ele.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname.startsWith(ele.href)
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
              >
                <div className=" flex items-center flex-1">
                  <ele.icon className={cn("h-5 w-5 mr-3 ", ele.color)} />
                  {ele.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
