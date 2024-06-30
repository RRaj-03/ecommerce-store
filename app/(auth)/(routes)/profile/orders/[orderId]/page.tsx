import React from "react";
import { Separator } from "@/components/ui/separator";
import Order from "./components/order";

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Your Orders</h3>
				<p className="text-sm text-muted-foreground">
					You can view all your orders here
				</p>
			</div>
			<Separator />
			<Order orderId={params.orderId} />
		</div>
	);
};

export default OrderPage;
