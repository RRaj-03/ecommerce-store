"use client";
import { SavedAddressFormValues } from "@/Schema/userSchema";
import { AddressCard } from "@/components/ui/addressCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddressList = ({
	setOpen,
	setDefaultValues,
	setRefresh,
	refresh,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setDefaultValues: React.Dispatch<
		React.SetStateAction<Partial<SavedAddressFormValues>>
	>;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
	refresh: boolean;
}) => {
	const [addresses, setAddresses] = useState<
		(SavedAddressFormValues & { id: string })[]
	>([]);
	useEffect(() => {
		const address = axios
			.get(`http://localhost:3001/api/user/address`, {
				withCredentials: true,
			})
			.then((res) => {
				setAddresses(res.data.address);
			})
			.catch((err) => {
				if (err?.response?.data?.message) {
					toast.error(err?.response?.data?.message);
				}
			});
		return () => {};
	}, [refresh]);

	return (
		<div className="lg:grid lg:grid-cols-2 gap-2 space-y-2 lg:space-y-0">
			{addresses.map((item) => {
				return (
					<>
						<AddressCard
							key={item.id}
							title={`${item.name}`}
							phoneNumber={item.phoneNumber}
							id={item.id}
							setOpen={setOpen}
							line1={item.line1}
							line2={item.line2}
							street={item.street}
							city={item.city}
							state={item.state}
							country={item.country}
							postalCode={item.postalCode}
							setDefaultValues={setDefaultValues}
							setRefresh={setRefresh}
						/>
					</>
				);
			})}
		</div>
	);
};

export default AddressList;
