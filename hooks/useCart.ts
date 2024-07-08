import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import axios from "axios";
interface CartStore {
	id: string;
	items: Product[];
	total: number;
	subtotal: number;
	coupoun: {
		id: string;
		code: string;
		fixed: boolean;
		amount: number;
		percentage: number;
		useBy: Date;
		description: string;
		archived: boolean;
	} | null;
	discount: number;
	coupounCode: string;
	addItem: (data: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
	updateCart: (data: Product[]) => void;
	initCart: () => void;
	applyCoupoun: (code: string) => void;
	removeCoupoun: (code: string) => void;
	setCoupounCode: (code: string) => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			id: "",
			items: [],
			coupounCode: "",
			total: 0,
			subtotal: 0,
			coupoun: {
				id: "",
				code: "",
				fixed: false,
				amount: 0,
				percentage: 0,
				useBy: new Date(),
				archived: false,
				description: "",
			},
			discount: 0,
			setCoupounCode: (code: string) => {
				set({ coupounCode: code });
			},
			addItem: (data: Product) => {
				const currentItems = get().items;
				const existingItem = currentItems.find((item) => item.id === data.id);
				if (existingItem) {
					return toast("Item already in cart.");
				}
				set({ items: [...get().items, data] });
				get().updateCart([...get().items]);
				toast.success("Item successfully added to cart.");
			},
			removeItem: (id: string) => {
				set({ items: [...get().items.filter((item) => item.id !== id)] });
				get().updateCart([...get().items]);
				toast.success("Item successfully removed from cart.");
			},
			removeAll: () => {
				set({ items: [] });
				get().updateCart([]);
			},
			initCart: () => {
				axios
					.get(`/api/user/cart`)
					.then((res) => {
						let cart = res.data.data.find(
							(cart: any) => cart.storeId === process.env.NEXT_PUBLIC_STOREID
						);
						if (cart) {
							set({
								items: cart.products,
								total: cart.total,
								subtotal: cart.subtotal,
								coupoun: cart.coupoun,
								discount: cart.discount,
								id: cart.id,
							});
						}
					})
					.catch((error) => {
						console.log("[error cart GET]", error);
						// if (error?.response?.status) {
						// 	toast.error(
						// 		error.response.data?.message || "Cart initialization failed."
						// 	);
						// } else {
						// 	toast.error("Cart initialization failed.");
						// }
					});
			},
			updateCart: (data: Product[]) => {
				axios
					.post(`/api/user/cart`, {
						storeId: process.env.NEXT_PUBLIC_STOREID,
						products: data,
					})
					.then((res) => {
						let cart = res.data.data;
						if (cart) {
							set({
								items: cart.products,
								total: cart.total,
								subtotal: cart.subtotal,
								coupoun: cart.coupoun,
								discount: cart.discount,
								id: cart.id,
							});
						}
					})
					.catch((error) => {
						console.log("[error cart POST]", error);
						if (error?.response?.status) {
							if (error?.response?.status === 401) {
								toast.error("Please login to Save the cart");
							} else {
								toast.error(
									error.response.data?.message || "Cart update failed."
								);
							}
						} else {
							toast.error("Cart update failed.");
						}
					});
			},
			applyCoupoun: (code: string) => {
				axios
					.post(`/api/user/coupoun/${get().id}/${code}`, {})
					.then((res) => {
						let cart = res.data.data;
						if (cart) {
							set({
								items: cart.products,
								total: cart.total,
								subtotal: cart.subtotal,
								coupoun: cart.coupoun,
								discount: cart.discount,
								id: cart.id,
							});
						}
					})
					.catch((error) => {
						console.log("[error coupoun POST]", error);
						if (error?.response?.status) {
							toast.error(
								error.response.data?.message || "Cart update failed."
							);
						} else {
							toast.error("Cart update failed.");
						}
					});
			},
			removeCoupoun: (code: string) => {
				axios
					.delete(`/api/user/coupoun/${get().id}/${code}`)
					.then((res) => {
						let cart = res.data.data;
						if (cart) {
							set({
								items: cart.products,
								total: cart.total,
								subtotal: cart.subtotal,
								coupoun: cart.coupoun,
								discount: cart.discount,
								id: cart.id,
							});
						}
					})
					.catch((error) => {
						console.log("[error coupoun DELETE]", error);
						if (error?.response?.status) {
							toast.error(
								error.response.data?.message || "Cart update failed."
							);
						} else {
							toast.error("Cart update failed.");
						}
					});
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCart;
