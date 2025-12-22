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
  const res = await fetch(url);
  return res.json();
};

export default getProducts;
