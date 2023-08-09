import getBillboards from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import Billboard from "@/components/billboard";
import ProductList from "@/components/productList";
import Contanier from "@/components/ui/contanier";
import React from "react";
export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboards("34556bc9-c4b5-4ef6-96a9-885b0cac95fb");
  return (
    <div>
      <Contanier>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Featured Products" items={products} />
          </div>
        </div>
      </Contanier>
    </div>
  );
};

export default HomePage;
