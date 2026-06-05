const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export interface OrderDetail {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  orderStatus: string;
  isPaid: boolean;
  paymentMethod: string;
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrier: string | null;
  estimatedDelivery: string | null;
  transactionId: string;
  createdAt: string;
  totalAmount: string;
  taxAmount: string;
  invoicePdfUrl: string;
  updatedAt: string;
  orderItems: {
    id: string;
    quantity: number;
    priceAtTime: string | null;
    product: {
      id: string;
      name: string;
      price: string;
      images: { id: string; url: string }[];
    };
  }[];
  statusHistory: {
    id: string;
    status: string;
    note: string | null;
    createdAt: string;
  }[];
}

const getOrder = async (orderId: string): Promise<OrderDetail | null> => {
  try {
    const res = await fetch(`${URL}/orders/${orderId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export default getOrder;
