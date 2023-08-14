"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
const MainNav = ({ data }: { data: Category[] }) => {
  const pathname = usePathname();
  const routes = [
    {
      label: "Categories",
      categories: data.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
      })),
    },
    {
      href: `/about`,
      label: "About Us",
      active: pathname === `/about`,
    },
  ];
  return (
    <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => {
            if (route?.categories) {
              return (
                <NavigationMenuItem className="w-full">
                  <NavigationMenuTrigger>{route.label}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full">
                    <ul className="grid  gap-3 p-4 w-[150px]">
                      {route.categories.map((component) => (
                        <Link
                          key={component.href}
                          href={component.href}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-black",
                            component.active ? "text-black" : "text-neutral-500"
                          )}
                        >
                          {component.label}
                        </Link>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }
            return (
              <NavigationMenuItem className="w-full">
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-black",
                    route.active ? "text-black" : "text-neutral-500"
                  )}
                >
                  {route.label}
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;
