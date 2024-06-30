import { Separator } from "@/components/ui/separator";
import { SavedAddress as SavedAddressForm } from "./components/SavedAddressForm";
import { auth } from "@/actions/getAuth";
import { DrawerDialog } from "@/components/ui/dialogDrawer";
import AddressList from "./components/AddressList";
import DialogDrawerForm from "./components/DialogDrawerForm";
const SavedAddress = async () => {
	const { userId } = await auth();
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Save Address</h3>
				<p className="text-sm text-muted-foreground">
					Save your addresses, For faster and smoother checkout
				</p>
			</div>
			<Separator />
			<DialogDrawerForm userId={userId!} />
		</div>
	);
};

export default SavedAddress;
