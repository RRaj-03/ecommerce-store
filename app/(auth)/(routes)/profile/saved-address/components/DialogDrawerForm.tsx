"use client";
import { DrawerDialog } from "@/components/ui/dialogDrawer";
import React from "react";
import { SavedAddress as SavedAddressForm } from "./SavedAddressForm";
import AddressList from "./AddressList";
import { SavedAddressFormValues } from "@/Schema/userSchema";

const defaultValue: Partial<SavedAddressFormValues> = {
	name: "",
	phoneNumber: "",
	line1: "",
	line2: "",
	street: "",
	city: "",
	state: "",
	country: "",
	postalCode: "",
};

const DialogDrawerForm = ({ userId }: { userId: string }) => {
	const [open, setOpen] = React.useState(false);
	const [defaultValues, setDefaultValues] = React.useState(defaultValue);
	const [refresh, setRefresh] = React.useState(false);
	return (
		<>
			<DrawerDialog
				buttonName="Add Address"
				title={defaultValues?.name !== "" ? "Edit Address" : "Add Address"}
				description="Save your addresses, For faster and smoother checkout"
				buttonVariant={"default"}
				open={open}
				setOpen={setOpen}
				onClose={() => setDefaultValues(defaultValue)}
			>
				<SavedAddressForm
					userId={userId!}
					setOpen={setOpen}
					defaultValues={defaultValues}
					setDefaultValues={setDefaultValues}
					setRefresh={setRefresh}
				/>
			</DrawerDialog>
			<AddressList
				setOpen={setOpen}
				setDefaultValues={setDefaultValues}
				setRefresh={setRefresh}
				refresh={refresh}
			/>
		</>
	);
};

export default DialogDrawerForm;
