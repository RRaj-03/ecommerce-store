"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button1";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import {
	SavedAddressFormSchema,
	SavedAddressFormValues,
} from "@/Schema/userSchema";
import { useSession } from "next-auth/react";

// This can come from your database or API.
const defaultValues: Partial<SavedAddressFormValues> = {
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

export function SavedAddress({ userId }: { userId: string }) {
	const [loading, setLoading] = useState(false);
	const form = useForm<SavedAddressFormValues>({
		resolver: zodResolver(SavedAddressFormSchema),
		defaultValues: defaultValues,
	});
	const session = useSession();
	function onSubmit(data: SavedAddressFormValues) {
		setLoading(true);
		axios
			.post("/api/user/change-text", {
				...data,
				userId: userId,
			})
			.then(() => {
				toast.success("text Updated");
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
				setLoading(false);
			});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-y-4 gap-x-4 grid grid-cols-2 text-lg"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Your Name" type="text" {...field} />
							</FormControl>
							<FormDescription>
								Your name is required to idetlify you at time of delivery.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mobile Number</FormLabel>
							<FormControl>
								<Input
									placeholder="Your Mobile Number"
									type="text"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Mobile Number will be used to contact you before or at time of
								delivery.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="line1"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Address Line 1</FormLabel>
							<FormControl>
								<Input placeholder="Address Line 1" type="text" {...field} />
							</FormControl>
							<FormDescription>
								Start with precise location. Example: House number, Flat Number,
								etc. .
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="line2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address Line 2</FormLabel>
							<FormControl>
								<Input placeholder="Address Line 2" type="text" {...field} />
							</FormControl>
							<FormDescription>Optional.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="street"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street/Road/Locality</FormLabel>
							<FormControl>
								<Input placeholder="Street Name" type="text" {...field} />
							</FormControl>
							<FormDescription>
								Area Name helps us easily identifying your house.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="City" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<FormControl>
								<Input placeholder="State" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input placeholder="Country" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="postalCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pincode</FormLabel>
							<FormControl>
								<Input placeholder="Pincode" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="col-span-2 mt-4">
					Add Address
				</Button>
			</form>
		</Form>
	);
}
