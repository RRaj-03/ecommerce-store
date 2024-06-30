"use client";
import React, { useState } from "react";
import { OrderColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button1";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/modals/alertModal";
import { format } from "date-fns";

export const CellAction = ({ data }: { data: OrderColumn }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [Open, setOpen] = useState(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Id coppied to the clipboard");
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${data.id}/cancel`,
        {
          status: "Cancelled",
        }
      );
      router.refresh();
      router.push("/");
      toast.success("Order Canceled.");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={Open}
        onClose={() => {
          setOpen(false);
        }}
        loading={loading}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className="mr-2 w-4 h-4" />
            Copy Order Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.transactionId);
            }}
          >
            <Copy className="mr-2 w-4 h-4" />
            Copy Transaction Id
          </DropdownMenuItem>
          {
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
              }}
            >
              <Trash className="mr-2 w-4 h-4" />
              Cancel Order
            </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
