"use client";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
	DialogClose,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button1";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerDialog({
	buttonName,
	buttonVariant: variant = "outline",
	title,
	description,
	open,
	setOpen,
	onClose,
	children,
}: {
	buttonName: string;
	buttonVariant?:
		| "link"
		| "default"
		| "outline"
		| "secondary"
		| "ghost"
		| null
		| undefined;
	title: string;
	description: string;
	children: React.ReactNode;
	open: boolean;
	onClose?: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [windowWidth, setWindowWidth] = React.useState(0);
	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, []);
	if (windowWidth > 768) {
		return (
			<>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant={variant}>{buttonName}</Button>
					</DialogTrigger>
					<DialogContent className="w-4/5 max-w-3xl" onClose={onClose}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						{children}
					</DialogContent>
				</Dialog>
			</>
		);
	}
	return (
		<>
			<Drawer open={open} onOpenChange={setOpen} onClose={onClose}>
				<DrawerTrigger asChild>
					<Button variant={variant}>{buttonName}</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>{title}</DrawerTitle>
						<DrawerDescription>{description}</DrawerDescription>
					</DrawerHeader>
					{children}
					<DrawerFooter className="pt-2">
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
