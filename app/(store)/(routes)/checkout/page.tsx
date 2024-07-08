import Contanier from "@/components/ui/contanier";
import Summary from "./components/summary";
import { auth } from "@/actions/getAuth";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
	const { userId } = await auth();
	if (!userId) {
		redirect("/auth");
	}
	return (
		<div className="bg-white ">
			<Contanier>
				<div className="px-4 py-16 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
					<div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
						<Summary />
					</div>
				</div>
			</Contanier>
		</div>
	);
};

export default CheckoutPage;
