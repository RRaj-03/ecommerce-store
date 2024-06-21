"use client";
import React from "react";
import { Button } from "@/components/ui/button1";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/ui/icon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { Category } from "@/types";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const HamburgerMenu = ({ data }: { data: Category[] }) => {
	const pathname = usePathname();
	const routes = [
		{
			label: "Categories",
			href: "/category",
			categories: data.map((route) => ({
				href: `/category/${route.id}`,
				label: route.name,
				active: pathname === `/category/${route.id}`,
			})),
		},
		{
			href: `/about`,
			label: "About Us",
			active: pathname === `/about`,
		},
	];
	return (
		<Sheet key="left">
			<SheetTrigger asChild>
				<Button variant="outline" className="px-3">
					<Icons.hamburger className=" h-4 w-4" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col justify-between">
				<div>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<SheetDescription>
							Your one-stop shop for amazing products and great deals.
						</SheetDescription>
					</SheetHeader>
					<ul className="">
						{routes.map((route, index) => {
							if (route?.categories) {
								return (
									<>
										<Accordion
											type="single"
											collapsible
											className="w-full pt-4"
										>
											<AccordionItem value="item-1">
												<AccordionTrigger
													className={cn(
														"p-1 no-underline hover:no-underline text-neutral-500 transition-colors",
														pathname.startsWith(route.href!)
															? "text-black"
															: "text-neutral-500"
													)}
												>
													{route.label}
												</AccordionTrigger>
												<AccordionContent>
													<ul className="flex flex-col  pt-2 text-base gap-y-2">
														{route.categories.map((component) => (
															<>
																<Link
																	key={component.href}
																	href={component.href}
																	className={cn(
																		" pl-4 text-sm font-medium transition-colors hover:text-black",
																		component.active
																			? "text-black"
																			: "text-neutral-500"
																	)}
																>
																	{component.label}
																</Link>
															</>
														))}
													</ul>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</>
								);
							}
							return (
								<>
									<Link
										key={route.href}
										href={route.href}
										className={cn(
											"p-1 block text-base font-medium transition-colors hover:text-black",
											route.active ? "text-black" : "text-neutral-500",
											index === routes.length - 1 ? "" : "border-b"
										)}
									>
										{route.label}
									</Link>
								</>
							);
						})}
					</ul>
				</div>
				<SheetFooter className="gap-y-2">
					<Button
						variant="default"
						className="w-full rounded-full flex text-base"
					>
						<ShoppingBag className="h-4 w-4" />
						<span className="pl-2">Cart</span>
					</Button>
					<Button
						variant="outline"
						className="w-full rounded-full flex text-base"
					>
						<User className="h-4 w-4" />
						<span className="pl-2">Profie</span>
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default HamburgerMenu;
