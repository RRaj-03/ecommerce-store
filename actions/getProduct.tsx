import { Product } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.warn("Returning mock product data due to fetch error:", error);
    return null;
  }
};

export default getProduct;
