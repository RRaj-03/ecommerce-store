"use client";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const Summary = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        user: {
          userId: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          fullName: user?.fullName,
          phoneNumber: user?.primaryPhoneNumber?.phoneNumber,
          emailAddress: user?.primaryEmailAddress?.emailAddress,
        },
      }
    );
    window.location = response.data.url;
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
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <SignedIn>
        <Button
          disabled={items.length === 0}
          className="mt-6 w-full"
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="mt-6 w-full">Sign In</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Summary;
