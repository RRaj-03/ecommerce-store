import { Store } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_STORE_URL}`;

const getStores = async (): Promise<Store> => {
  try {
    const res = await fetch(`${URL}`);
    return res.json();
  } catch (error) {
    console.warn("Returning mock store data due to fetch error:", error);
    return {
      id: "mock-store-id",
      name: "Mock Store",
      images: [],
    };
  }
};

export default getStores;
