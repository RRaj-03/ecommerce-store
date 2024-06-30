import getOrders from "@/actions/getOrders";
import { DataTable } from "@/components/ui/dataTable";
import { getServerSession } from "next-auth/next";
import React from "react";
import { OrderColumn, columns } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { auth } from "@/actions/getAuth";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const OrderPage = async () => {
	const { userId } = await auth();
	if (!userId) redirect("/auth");
	const orders = await getOrders(userId!);
	const formattedOrders: OrderColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.address.phoneNumber,
		address: `${item.address.name}\n${item.address.line1}, ${item.address?.line2}, ${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.country}, ${item.address.postalCode}`,
		products: item.Products.map((orderItem) => orderItem.name).join(", "),
		totalPrice: formatter.format(item.total),
		paidAmount: formatter.format(item.paidAmount),
		subtotal: formatter.format(item.subtotal),
		discount: formatter.format(item.discount),
		coupounCode: item?.coupouns?.code,
		transactionId: item.transactionId,
		isPaid: item.isPaid,
		createdAt: format(
			new Date(item.createdAt.toString().slice(0, 10)),
			"MMMM do, yyyy"
		),
	}));
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Your Orders</h3>
				<p className="text-sm text-muted-foreground">
					You can view all your orders here
				</p>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={formattedOrders}
				searchKey="products"
			/>
		</div>
	);
};

export default OrderPage;
