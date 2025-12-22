import { Filter } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/filters`;

const getFilters = async (storeId?: string): Promise<Filter[]> => {
  // If storeId is part of the API route (e.g. /api/storeId/filters), we might need it.
  // But typically the NEXT_PUBLIC_API_URL includes the base or we append /filters.
  // In the admin, it was /api/[storeId]/...
  // In the store app, the env var usually points to specific store's API or just base.
  // Let's assume URL points to /api/[storeId] base based on getProducts logic.
  // getProducts used: const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  // So process.env.NEXT_PUBLIC_API_URL is likely ".../api/[storeId]"
  
  const res = await fetch(URL);
  return res.json();
};

export default getFilters;
