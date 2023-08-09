import getCategory from "@/actions/getCategory";
import getColors from "@/actions/getColors";
import getProducts from "@/actions/getProducts";
import getSizes from "@/actions/getSizes";
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
    colorId: string;
    sizeId: string;
  };
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  return (
    <div className="bg-white ">
      <Contanier>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey={"sizeId"} name="Sizes" data={sizes} />
              <Filter valueKey={"colorId"} name="Colors" data={colors} />
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
