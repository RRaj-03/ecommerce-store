import React from "react";
import Contanier from "./ui/contanier";
import Link from "next/link";
import MainNav from "./mainNav";
import getCategories from "@/actions/getCategories";
import NavbarActions from "./navbarActions";
import { auth } from "@/actions/getAuth";
import HamburgerMenu from "./hamburgerMenu";
export const revalidate = 0;

const Navbar = async () => {
	const categories = await getCategories();
	const user = await auth();
	return (
		<div className="border-b">
			<Contanier>
				<div className="px-4 relative sm:px-6 lg:px-8 flex items-center h-16">
					<div className="block lg:hidden">
						<HamburgerMenu data={categories} />
					</div>
					<Link href={"/"} className="ml-4 lg:ml-0 flex gap-x-2">
						<p className="font-bold text-xl">STORE</p>
					</Link>
					<div className="hidden lg:block">
						<MainNav data={categories} />
					</div>
					<NavbarActions user={user} />
				</div>
			</Contanier>
		</div>
	);
};

export default Navbar;
