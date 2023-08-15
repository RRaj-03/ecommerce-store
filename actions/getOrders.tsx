import { Order } from "@/types";
import axios from "axios";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (userId: string): Promise<Order[]> => {
  const res = await axios.post(URL, { userId });
  return res.data;
};

export default getOrders;
