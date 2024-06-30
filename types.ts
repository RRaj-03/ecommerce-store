import { string } from "zod";

export interface Billboard {
	id: string;
	label: string;
	imageURL: string;
}

export interface Category {
	id: string;
	name: string;
	billboard: Billboard;
}

export interface Store {
	id: string;
	name: string;
	emailAddress?: string;
	phoneNumber?: string;
	Address?: string;
	images: Image[];
	tax: number;
}

export interface Product {
	id: string;
	category: Category;
	name: string;
	price: string;
	isFeatured: boolean;
	size: Size;
	color: Color;
	images: Image[];
	filterItems: Filters[];
}
export interface Filters {
	filterItem: {
		value: string;
		filter: {
			name: string;
		};
	};
}

export interface Image {
	id: string;
	url: string;
}

export interface Size {
	id: string;
	name: string;
	value: string;
}
export interface Color {
	id: string;
	name: string;
	value: string;
}

export interface Order {
	id: string;
	address: Addresses;
	phone: string;
	subtotal: number;
	discount: number;
	coupouns: {
		code: string;
	};
	paidAmount: number;
	userId: string;
	transactionId: string;

	Products: Product[];
	total: number;
	paidAt: Date;
	isPaid: boolean;
	store: Store;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	};
	createdAt: Date;
	updatedAt: Date;
}

export interface Addresses {
	id: string;
	userId: string;
	user?: any;
	order?: Order[];
	name: string;
	line1: string;
	line2?: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	street: string;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
}
