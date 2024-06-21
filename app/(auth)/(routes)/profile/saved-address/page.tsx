import { Separator } from "@/components/ui/separator";
import { SavedAddress as SavedAddressForm } from "./components/SavedAddressForm";
import { auth } from "@/actions/getAuth";
import { DrawerDialog } from "@/components/ui/dialogDrawer";
import { AddressCard } from "@/components/ui/addressCard";

export default async function SavedAddress() {
	const { userId } = await auth();
	// const addresses = await getAddresses()
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Save Address</h3>
				<p className="text-sm text-muted-foreground">
					Save your addresses, For faster and smoother checkout
				</p>
			</div>
			<Separator />
			<DrawerDialog
				buttonName="Add Address"
				title="Add Address"
				description="Save your addresses, For faster and smoother checkout"
				buttonVariant={"default"}
			>
				<SavedAddressForm userId={userId!} />
			</DrawerDialog>
			{}
			<AddressCard
				title="Ritik Raj"
				phoneNumber="9001175253"
				desc={`House 112C \n Nandanagar \n Gorakhpur \n Uttar Pradesh, India \n 273008`}
			/>
		</div>
	);
}
