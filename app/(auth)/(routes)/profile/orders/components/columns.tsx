"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellAction";

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	subtotal: string;
	discount: string;
	coupounCode: string;
	products: string;
	createdAt: string;
	transactionId: string;
	paidAmount: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: "id",
		header: "Order Id",
	},
	{
		accessorKey: "products",
		header: "Products",
	},
	{
		accessorKey: "coupounCode",
		header: "Coupoun",
	},
	{
		accessorKey: "subtotal",
		header: "Subtotal",
	},
	{
		accessorKey: "discount",
		header: "Discount",
	},
	{
		accessorKey: "paidAmount",
		header: "Paid Amount",
	},
	{
		accessorKey: "totalPrice",
		header: "Total Price",
	},
	{
		accessorKey: "phone",
		header: "Shipping Number",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "transactionId",
		header: "Transaction Id",
	},
	{
		accessorKey: "isPaid",
		header: "Paid",
	},
	{
		accessorKey: "createdAt",
		header: "Order Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
