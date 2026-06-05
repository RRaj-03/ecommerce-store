import { Product } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.warn("Returning mock product data due to fetch error:", error);
    return {
      id: id,
      name: "SANDSBERG Chair",
      price: "2490",
      description: "A sturdy chair for everyday use.",
      isFeatured: true,
      category: {
        id: "chairs",
        name: "Chairs",
        billboard: {
          id: "1",
          label: "Chairs",
          imageURL:
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
        },
      },
      images: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1000&auto=format&fit=crop",
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1503602642458-2321114458ed?q=80&w=1000&auto=format&fit=crop",
        },
      ],
      filterItems: [],
    };
  }
};

export default getProduct;
