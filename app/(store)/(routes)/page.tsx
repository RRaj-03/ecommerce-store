import getBillboards from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import getStores from "@/actions/getStore";
import Billboard from "@/components/billboard";
import Carousel from "@/components/carousel";
import ProductList from "@/components/productList";
import Stats from "@/components/stats";
import Testinomials from "@/components/testinomials";
import Contanier from "@/components/ui/contanier";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
export const revalidate = 0;

const HomePage = async () => {
	const products = await getProducts({ isFeatured: true });
	const images = (await getStores()).images;
	return (
		<div>
			<div className="pb-10">
				<Carousel images={images} />
			</div>
			<Contanier>
				<div className="space-y-10 pb-10">
					<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
						<ProductList title="Featured Products" items={products} />
					</div>
				</div>
			</Contanier>
			<Stats />
			<Testinomials />
		</div>
	);
};

export default HomePage;
