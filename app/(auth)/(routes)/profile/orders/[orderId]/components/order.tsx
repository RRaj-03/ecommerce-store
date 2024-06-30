"use client";
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	MoreVertical,
	Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button1";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import { getOrder } from "@/actions/getOrders";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export default function OrderBill({ orderId }: { orderId: string }) {
	const [order, setOrder] = useState<Order>({
		id: orderId,
		phone: "",
		address: {
			id: "",
			userId: "",
			name: "",
			line1: "",
			line2: "",
			city: "",
			state: "",
			country: "",
			postalCode: "",
			street: "",
			phoneNumber: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		isPaid: false,
		paidAt: new Date(),
		total: 0,
		subtotal: 0,
		discount: 0,
		coupouns: {
			code: "",
		},
		Products: [],
		createdAt: new Date(),
		transactionId: "",
		paidAmount: 0,
		userId: "",
		user: {
			id: "",
			firstName: "",
			lastName: "",
			email: "",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		store: {
			tax: 0,
			id: "",
			name: "",
			images: [],
		},
		updatedAt: new Date(),
	});
	useEffect(() => {
		getOrder(orderId)
			.then((data) => {
				setOrder(data);
			})
			.catch((error) => {
				console.log("error", error);
				toast.error("Failed to fetch order");
			});
	}, []);

	return (
		<Card className="overflow-hidden lg:max-w-2xl">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg">
						Order {order.id}
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Order ID</span>
						</Button>
					</CardTitle>
					<CardDescription>
						Date:{" "}
						{format(
							new Date(order.paidAt.toString().slice(0, 10)),
							"MMMM do, yyyy"
						)}
					</CardDescription>
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" className="h-8 gap-1">
						<Truck className="h-3.5 w-3.5" />
						<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
							Track Order
						</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="outline" className="h-8 w-8">
								<MoreVertical className="h-3.5 w-3.5" />
								<span className="sr-only">More</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Edit</DropdownMenuItem>
							<DropdownMenuItem>Export</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Trash</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="font-semibold">Order Details</div>
					<ul className="grid gap-3">
						{order.Products.map((product) => (
							<li
								key={product.id}
								className="flex items-center justify-between"
							>
								<span className="text-muted-foreground">
									{product.name} x <span>{1}</span>
								</span>
								<span>{formatter.format(parseInt(product.price))}</span>
							</li>
						))}
					</ul>
					<Separator className="my-2" />
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Subtotal</span>
							<span>{formatter.format(order.subtotal)}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Discount</span>
							<span>-{formatter.format(order.discount)}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Tax</span>
							<span>
								{formatter.format(
									((order.subtotal - order.discount) * order?.store?.tax) / 100
								)}
							</span>
						</li>
						<li className="flex items-center justify-between font-semibold">
							<span className="text-muted-foreground">Total</span>
							<span>{formatter.format(order.total)}</span>
						</li>
					</ul>
				</div>
				<Separator className="my-4" />
				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-3">
						<div className="font-semibold">Shipping Information</div>
						<address className="grid gap-0.5 not-italic text-muted-foreground">
							<span>{order.address.name}</span>
							<span>
								{order.address.line1}, {order.address?.line2}
							</span>
							<span>
								{order.address.street}, {order.address.city}
							</span>
							<span>
								{order.address.state}, {order.address.country} -{" "}
								{order.address.postalCode}
							</span>
						</address>
					</div>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Customer Information</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Customer</dt>
							<dd>
								{order.user.firstName} + {order.user.lastName}
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Email</dt>
							<dd>
								<a href="mailto:">{order.user.email}</a>
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Phone</dt>
							<dd>
								<a href="tel:">+91 {order.address.phoneNumber}</a>
							</dd>
						</div>
					</dl>
				</div>
				<Separator className="my-4" />
				<div className="grid gap-3">
					<div className="font-semibold">Payment Information</div>
					<dl className="grid gap-3">
						<div className="flex items-center justify-between">
							<dt className="flex items-center gap-1 text-muted-foreground">
								<CreditCard className="h-4 w-4" />
								Visa
							</dt>
							<dd>**** **** **** 4532</dd>
						</div>
					</dl>
				</div>
			</CardContent>
			<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
				<div className="text-xs text-muted-foreground">
					Updated{" "}
					<time dateTime="2023-11-23">
						{format(
							new Date(order.updatedAt.toString().slice(0, 10)),
							"MMMM do, yyyy"
						)}
					</time>
				</div>
			</CardFooter>
		</Card>
	);
}
