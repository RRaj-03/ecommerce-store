"use client";
import React from "react";
import { ArrowRightFromLine, Menu, Settings, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu1";
import Link from "next/link";

const UserProfileButton = () => {
  const { user } = useUser();
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem slot="right">
            <NavigationMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent role="menuitem">
              <div className="w-96 max-w-[calc(100vw-2rem)] items-stretch flex flex-col py-6">
                <div className="flex gap-4 items-center justify-start w-full px-6 mb-2 ">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-stretch justify-center text-center">
                    <div className="font-medium text-sm text-ellipsis whitespace-nowrap flex">
                      {user?.fullName}
                    </div>
                    <div className="font-normal text-sm text-ellipsis whitespace-nowrap text-black/60">
                      {user?.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch justify-center font-normal text-sm">
                  <Link
                    href={"/profile"}
                    className="flex items-center gap-4 justify-start py-[0.875rem] pl-8  px-6  hover:bg-black/[0.04] transition-colors duration-100"
                  >
                    <div className="flex items-stretch justify-center">
                      <Settings className="h-4 w-4 text-black/50" />
                    </div>
                    <div className="text-black/60 font-medium">
                      Manage Account
                    </div>
                  </Link>
                  <Link
                    href={"/orders"}
                    className="flex items-center gap-4 justify-start py-[0.875rem] pl-8  px-6  hover:bg-black/[0.04] transition-colors duration-100"
                  >
                    <div className="flex items-stretch justify-center">
                      <ShoppingCart className="h-4 w-4 text-black/50" />
                    </div>
                    <div className="text-black/60 font-medium">Your Orders</div>
                  </Link>
                  <button className="flex items-center gap-4 justify-start py-[0.875rem] pl-8  px-6  hover:bg-black/[0.04] transition-colors duration-100">
                    <ArrowRightFromLine className="h-4 w-4 text-black/50" />
                    <div className="text-black/60 font-medium">Sign Out</div>
                  </button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserProfileButton;
