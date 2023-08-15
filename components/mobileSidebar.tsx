"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import Button from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

const MobileSidebar = ({ name }: { name: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger className="hover:bg-accent p-2 rounded-full">
          <Menu size={25} />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <Sidebar name={name} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
