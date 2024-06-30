"use client";
import { Copy, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button1";
import { toast } from "react-hot-toast";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SavedAddressFormValues } from "@/Schema/userSchema";
import axios from "axios";

interface ApiAlertProps {
	title: string;
	phoneNumber: string;
	id: string;
	line1: string;
	line2?: string;
	street: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	viewOnly?: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setDefaultValues: React.Dispatch<
		React.SetStateAction<Partial<SavedAddressFormValues>>
	>;
	setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddressCard = ({
	title,
	line1,
	line2,
	street,
	city,
	state,
	country,
	postalCode,
	phoneNumber,
	id,
	viewOnly = false,
	setOpen,
	setDefaultValues,
	setRefresh,
}: ApiAlertProps) => {
	const onCopy = (desc: string) => {
		navigator.clipboard.writeText(desc);
		toast.success("Coppied to the clipboard");
	};
	let desc = `${line1} ${
		line2 ? "\n" : ""
	} ${line2} \n ${street} \n ${city} \n ${state}, ${country} \n ${postalCode}`;
	return (
		<Alert>
			<ServerIcon className="h-4 w-4" />
			<AlertTitle className="flex items-center gap-x-2">
				{title}
				<Badge variant={"default"}>{phoneNumber}</Badge>
			</AlertTitle>
			<AlertDescription className="mt-4 flex justify-between items-center whitespace-pre-line">
				{desc}
			</AlertDescription>
			{!viewOnly && (
				<div className="absolute top-2 right-2">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								variant={"outline"}
								size={"icon"}
								className=" !pl-0 !p-1 w-8 h-8"
							>
								<EllipsisVerticalIcon className="w-full h-full" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Address Menu</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									onCopy(
										`Name: ${title}\n Phone Number: ${phoneNumber} \n Address:  ${desc}`
									);
								}}
							>
								Copy
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setOpen(true);
									setDefaultValues({
										name: title,
										phoneNumber: phoneNumber,
										line1: line1,
										line2: line2,
										street: street,
										city: city,
										state: state,
										country: country,
										postalCode: postalCode,
									});
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								className=" focus:bg-red-600 focus:text-white"
								onClick={() => {
									axios
										.delete(`http://localhost:3001/api/user/address/${id}`, {
											withCredentials: true,
										})
										.then((res) => {
											toast.success(res.data.message);
											setRefresh(true);
										})
										.catch((err) => {
											if (err?.response?.data?.message) {
												toast.error(err?.response?.data?.message);
											}
											toast.error("Something went wrong");
										});
								}}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</Alert>
	);
};
