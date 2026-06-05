import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.id
        );
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.product.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Quantity increased.");
        } else {
          set({ items: [...currentItems, { product: data, quantity: 1 }] });
          toast.success("Item added to cart.");
        }
      },
      increaseQuantity: (id: string) => {
        set({
          items: get().items.map((item) =>
            item.product.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },
      decreaseQuantity: (id: string) => {
        const current = get().items.find((i) => i.product.id === id);
        if (!current) return;
        if (current.quantity <= 1) {
          set({ items: get().items.filter((i) => i.product.id !== id) });
          toast.success("Item removed from cart.");
        } else {
          set({
            items: get().items.map((item) =>
              item.product.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.product.id !== id) });
        toast.success("Item removed from cart.");
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
