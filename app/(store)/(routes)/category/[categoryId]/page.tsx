import getCategory from "@/actions/getCategory";
import getFilters from "@/actions/getFilters";
import getProducts from "@/actions/getProducts";
import Billboard from "@/components/billboard";
import Contanier from "@/components/ui/contanier";
import React from "react";
import Filter from "./components/filter";
import NoResults from "@/components/ui/noResults";
import ProductCard from "@/components/ui/productCard";
import MobileFilters from "./components/mobileFilters";
export const revalidate = 0;
const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    ...searchParams,
  });
  const filters = await getFilters();
  const category = await getCategory(params.categoryId);
  return (
    <div className="bg-white ">
      <Contanier>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters filters={filters} />
            <div className="hidden lg:block">
              {filters.map((filter) => (
                <Filter
                  valueKey={filter.id}
                  name={filter.name}
                  data={filter.filterItems}
                />
              ))}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard data={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Contanier>
    </div>
  );
};

export default CategoryPage;
