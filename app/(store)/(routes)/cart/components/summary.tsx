"use client";
import { Button } from "@/components/ui/button1";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { CrossIcon, X } from "lucide-react";

const Summary = () => {
	const searchParams = useSearchParams();
	const items = useCart((state) => state.items);
	const removeAll = useCart((state) => state.removeAll);
	const coupounCode = useCart((state) => state.coupounCode);
	const coupoun = useCart((state) => state.coupoun);
	const discount = useCart((state) => state.discount);
	const total = useCart((state) => state.total);
	const subtotal = useCart((state) => state.subtotal);
	const setCoupounCode = useCart((state) => state.setCoupounCode);
	const applyCoupoun = useCart((state) => state.applyCoupoun);
	const removeCoupoun = useCart((state) => state.removeCoupoun);

	const router = useRouter();
	const { status, data }: any = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/auth");
		},
	});
	const onCheckout = async () => {
		if (status !== "authenticated") {
		} else {
			const user = data?.User;
			if (!user) {
				router.push("/auth");
			}
			if (items.length === 0) {
				toast.error("Cart is empty");
				return;
			}
			router.push(`/checkout`);
		}
	};
	useEffect(() => {
		if (searchParams.get("success")) {
			toast.success("Payment completed.");
			removeAll();
		}
		if (searchParams.get("canceled")) {
			toast.error("Something went wrong");
		}
	}, [removeAll, searchParams]);

	return (
		<div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
			<h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
			<div className="mt-6 space-y-6">
				<div className="flex items-center justify-between border-t border-gray-200 pt-4">
					<div className="text-base font-medium text-gray-900">Subtotal</div>
					<Currency value={subtotal} />
				</div>
			</div>
			<div>
				<Accordion
					type="single"
					collapsible
					className="w-full"
					defaultValue={
						coupoun
							? coupoun?.code !== ""
								? "coupouns"
								: undefined
							: undefined
					}
				>
					<AccordionItem value="coupouns">
						<AccordionTrigger>Apply coupouns</AccordionTrigger>
						<AccordionContent>
							{coupoun ? (
								coupoun?.code !== "" ? (
									<>
										<div
											className="flex items-center justify-between border-t border-gray-200 pt-4 group hover:text-red-400"
											onClick={() => {
												removeCoupoun(coupoun?.code);
											}}
										>
											<div className="flex items-center justify-start w-full ">
												<X
													height={15}
													className="group-hover:opacity-100 opacity-0  text-red-500"
												/>
												<div className="text-base font-medium text-gray-900 group-hover:text-red-400  flex-1">
													<div>{coupoun?.code}</div>
													<div className="text-sm text-muted-foreground">
														{coupoun?.description}
													</div>
												</div>
											</div>
											<div className="flex items-center justify-end text-center gap-1">
												<span>-</span>
												<Currency value={discount} />
											</div>
										</div>
									</>
								) : (
									<div className="flex w-full max-w-sm items-center space-x-2 p-2">
										<Input
											type="text"
											placeholder="Enter Coupoun Code"
											defaultValue={coupounCode}
											onChange={(e) => {
												setCoupounCode(e.target.value.toUpperCase());
											}}
										/>
										<Button
											onClick={() => {
												applyCoupoun(coupounCode);
											}}
											className="rounded-md"
										>
											Apply
										</Button>
									</div>
								)
							) : (
								<div className="flex w-full max-w-sm items-center space-x-2 p-2">
									<Input
										type="text"
										placeholder="Enter Coupoun Code"
										defaultValue={coupounCode}
										onChange={(e) => {
											setCoupounCode(e.target.value.toUpperCase());
										}}
									/>
									<Button
										onClick={() => {
											applyCoupoun(coupounCode);
										}}
										className="rounded-md"
									>
										Apply
									</Button>
								</div>
							)}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="flex items-center justify-between border-t border-gray-200 pt-4">
				<div className="text-base font-medium text-gray-900">Order total</div>
				<Currency value={total} />
			</div>
			<Button
				disabled={items.length === 0}
				className="mt-6 w-full"
				onClick={onCheckout}
			>
				Checkout
			</Button>
		</div>
	);
};

export default Summary;
