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
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { CrossIcon, X } from "lucide-react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormDescription,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AddressCard } from "@/components/ui/addressCard";
import { Addresses } from "@/types";
const addressFormSchema = z.object({
	address: z.object({
		id: z.string({ required_error: "Required" }),
		userId: z.string({ required_error: "Required" }),
		name: z.string({ required_error: "Required" }),
		line1: z.string({ required_error: "Required" }),
		line2: z.string().optional(),
		city: z.string({ required_error: "Required" }),
		state: z.string({ required_error: "Required" }),
		country: z.string({ required_error: "Required" }),
		postalCode: z.string({ required_error: "Required" }),
		street: z.string({ required_error: "Required" }),
		phoneNumber: z.string({ required_error: "Required" }),
	}),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

const Summary = () => {
	const searchParams = useSearchParams();
	const items = useCart((state) => state.items);
	const cartId = useCart((state) => state.id);
	const removeAll = useCart((state) => state.removeAll);
	const coupounCode = useCart((state) => state.coupounCode);
	const coupoun = useCart((state) => state.coupoun);
	const discount = useCart((state) => state.discount);
	const total = useCart((state) => state.total);
	const subtotal = useCart((state) => state.subtotal);
	const setCoupounCode = useCart((state) => state.setCoupounCode);
	const applyCoupoun = useCart((state) => state.applyCoupoun);
	const removeCoupoun = useCart((state) => state.removeCoupoun);
	const [addresses, setAddresses] = useState<Addresses[]>([]);
	const router = useRouter();
	const { status, data }: any = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/auth");
		},
	});
	const user = data?.User;
	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressFormSchema),
		defaultValues: {
			address: undefined,
		},
	});

	function onSubmit(data: AddressFormValues) {
		try {
			console.log("data", data);
			toast.success("Address updated successfully");
		} catch (error: any) {
			if (error?.response?.data?.message) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error("Something went wrong");
			}
		}
	}
	const onCheckout = async () => {
		if (status !== "authenticated") {
		} else {
			form.handleSubmit(onSubmit);
			let newaddress = form.getValues("address");
			if (!newaddress) {
				toast.error("Please select an address.");
				return;
			}
			const user = data?.User;
			if (!user) {
				router.push("/auth");
			}
			const response = await axios.post(
				`/api/checkout?redirectUrl=${window.location.href}`,
				{
					cartId,
					addressId: newaddress.id,
				}
			);
			window.location = response.data.url;
		}
	};
	useEffect(() => {
		if (searchParams.get("success")) {
			router.push("/");
			toast.success("Payment completed.");
			removeAll();
		}
		if (searchParams.get("canceled")) {
			router.push("/");
			toast.error("Something went wrong");
		}
	}, [removeAll, searchParams]);
	useEffect(() => {
		axios
			.get(`/api/user/address`)
			.then((res) => {
				setAddresses(res.data.address);
			})
			.catch((error) => {
				console.log("[error Address GET]", error);
				if (error?.response?.status) {
					toast.error(
						error.response.data?.message || "Address initialization failed."
					);
				} else {
					toast.error("Address initialization failed.");
				}
			});
	}, []);

	return (
		<>
			<div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 flex-1 lg:col-span-7">
				<h2 className="text-lg font-medium text-gray-900">Address</h2>
				<Form {...form}>
					<form className="space-y-8 lg:max-w-2xl">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>Address</FormLabel>
									<FormDescription>
										Select the saved address for the dashboard.
									</FormDescription>
									<FormMessage />
									<RadioGroup
										className="grid max-w-2xl grid-cols-1 gap-8 pt-2"
										onValueChange={(value) => {
											console.log("address", value);
											form.setValue("address", JSON.parse(value));
										}}
									>
										{addresses.map((address) => (
											<FormItem>
												<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
													<FormControl>
														<RadioGroupItem
															value={JSON.stringify(address)}
															className="sr-only"
														/>
													</FormControl>
													<AddressCard
														key={address.id}
														title={`${address.name}`}
														phoneNumber={address.phoneNumber}
														id={address.id}
														setOpen={() => {}}
														line1={address.line1}
														line2={address.line2}
														street={address.street}
														city={address.city}
														state={address.state}
														country={address.country}
														postalCode={address.postalCode}
														setDefaultValues={() => {}}
														setRefresh={() => {}}
														viewOnly={true}
													/>
												</FormLabel>
											</FormItem>
										))}
									</RadioGroup>
								</FormItem>
							)}
						/>

						<Button type="submit">Update preferences</Button>
					</form>
				</Form>
			</div>
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
		</>
	);
};

export default Summary;
