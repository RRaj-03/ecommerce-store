import getOrders from "@/actions/getOrders";
import { DataTable } from "@/components/ui/dataTable";
import { auth } from "@clerk/nextjs";
import React from "react";
import { OrderColumn, columns } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrderPage = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId!);
  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    transactionId: item.transactionId,
    isPaid: item.isPaid,
    createdAt: format(
      new Date(item.createdAt.toString().slice(0, 10)),
      "MMMM do, yyyy"
    ),
  }));
  return (
    <div className="px-6 pb-8">
      <div className="gap-y-1 flex flex-col items-stretch justify-start mt-2">
        <div className="font-semibold text-4xl">Orders</div>
        <div className="font-normal text-base text-muted-foreground">
          You can manage your orders here
        </div>
      </div>
      <hr className="my-10 border-none" />
      <DataTable
        columns={columns}
        data={formattedOrders}
        searchKey="products"
      />
    </div>
  );
};

export default OrderPage;
