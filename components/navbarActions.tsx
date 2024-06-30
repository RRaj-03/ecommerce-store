"use client";
import React, { useEffect, useState } from "react";
import Button from "./ui/button";
import { ShoppingBag } from "lucide-react";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";

import UserButton from "./userProfileButton";
import { useSession } from "next-auth/react";
const NavbarActions = ({ user }: { user: any }) => {
	const cart = useCart();
	const router = useRouter();
	const { status } = useSession();

	const [isMounted, setIsMounted] = useState(false);
	const init = useCart((state) => state.initCart);
	useEffect(() => {
		init();
		setIsMounted(true);
	}, []);
	if (!isMounted) {
		return null;
	}

	return (
		<div className="ml-auto flex items-center gap-x-4">
			{status === "authenticated" ? (
				<UserButton user={user} />
			) : (
				<Button
					onClick={() => {
						router.push("/auth");
					}}
				>
					Sign In
				</Button>
			)}
			<Button
				onClick={() => {
					router.push(`/cart`);
				}}
				className="flex items-center rounded-full bg-black px-4 py-2"
			>
				<ShoppingBag size={20} color="white" />
				<span className="ml-2 text-sm font-medium text-white">
					{cart?.items?.length}
				</span>
			</Button>
		</div>
	);
};

export default NavbarActions;
