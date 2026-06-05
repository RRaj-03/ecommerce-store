import getOrder from "@/actions/getOrder";
import Contanier from "@/components/ui/contanier";
import { notFound } from "next/navigation";
import React from "react";
import OrderTimeline from "./components/order-timeline";

const OrderTrackPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const order = await getOrder(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Contanier>
        <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <OrderTimeline order={order} />
        </div>
      </Contanier>
    </div>
  );
};

export default OrderTrackPage;
