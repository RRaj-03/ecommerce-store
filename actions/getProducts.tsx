import { Product } from "@/types";
import qs from "query-string";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async (query: {
  categoryId?: string;
  isFeatured?: boolean;
  [key: string]: any;
}): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      ...query,
    },
  });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    return [];
  }
};

export default getProducts;
