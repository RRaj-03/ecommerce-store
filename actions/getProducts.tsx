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
    console.warn("Returning mock products data due to fetch error:", error);
    return [
      {
        id: "1",
        name: "SANDSBERG Chair",
        price: "2490",
        description: "Mock description",
        isFeatured: true,
        category: {
          id: "chairs",
          name: "Chairs",
          billboard: { id: "1", label: "Chairs", imageURL: "" },
        },
        images: [
          {
            id: "1",
            url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
          },
        ],
        filterItems: [],
      },
      {
        id: "2",
        name: "ODGER Chair",
        price: "5990",
        description: "Mock description",
        isFeatured: false,
        category: {
          id: "chairs",
          name: "Chairs",
          billboard: { id: "1", label: "Chairs", imageURL: "" },
        },
        images: [
          {
            id: "1",
            url: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1000&auto=format&fit=crop",
          },
        ],
        filterItems: [],
      },
    ];
  }
};

export default getProducts;
