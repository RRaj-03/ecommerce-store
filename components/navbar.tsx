import React from "react";
import Contanier from "./ui/contanier";
import Link from "next/link";
import MainNav from "./mainNav";
import getCategories from "@/actions/getCategories";
import NavbarActions from "./navbarActions";
export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Contanier>
        <div className="px-4 relative sm:px-6 lg:px-8 flex items-center h-16">
          <Link href={"/"} className="ml-4 lg:ml-0 flex gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Contanier>
    </div>
  );
};

export default Navbar;
