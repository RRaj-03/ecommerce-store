"use client";
import { Copy, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button1";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
	title: string;
	desc: string;
	phoneNumber: string;
}

export const AddressCard = ({ title, desc, phoneNumber }: ApiAlertProps) => {
	const onCopy = (desc: string) => {
		navigator.clipboard.writeText(desc);
		toast.success("Api route coppied to the clipboard");
	};
	return (
		<Alert>
			<ServerIcon className="h-4 w-4" />
			<AlertTitle className="flex items-center gap-x-2">
				{title}
				<Badge variant={"default"}>{phoneNumber}</Badge>
			</AlertTitle>
			<AlertDescription className="mt-4 flex justify-between items-center whitespace-pre-line">
				{desc}
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={() => {
						onCopy(
							`Name: ${title}\n Phone Number: ${phoneNumber} \n Address:  ${desc}`
						);
					}}
				>
					<Copy className="h-4 w-4" />
				</Button>
			</AlertDescription>
		</Alert>
	);
};
