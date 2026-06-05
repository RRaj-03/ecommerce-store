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
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  description?: string;
  measurements?: string;
  materialsAndCare?: string;
  assembly?: string;
  sku?: string;
  slug?: string;
  weight?: string;
  compareAtPrice?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  isFeatured: boolean;
  inventory: number;
  images: Image[];
  filterItems: ProductOnFilterItem[];
}

export interface ProductOnFilterItem {
  filterItem: FilterItem & {
    filter: Filter;
  };
}

export interface Filter {
  id: string;
  name: string;
  filterItems: FilterItem[];
}

export interface FilterItem {
  id: string;
  name: string;
  value: string;
}

export interface Order {
  id: string;
  address: string;
  phone: string;
  userId: string;
  transactionId: string;
  orderStatus: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  paymentMethod: string;
  estimatedDelivery?: string;
  orderItems: {
    product: Product;
    quantity: number;
    priceAtTime?: string;
  }[];
  isPaid: boolean;
  totalAmount: string;
  taxAmount: string;
  invoicePdfUrl?: string;
  createdAt: Date;
  statusHistory?: OrderStatusHistoryEntry[];
}

export interface OrderStatusHistoryEntry {
  id: string;
  status: string;
  note?: string;
  createdAt: Date;
}

export interface Image {
  id: string;
  url: string;
}

export interface StoreTheme {
  preset: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  mutedColor: string;
  mutedForeground: string;
  borderColor: string;
  cardColor: string;
  destructiveColor: string;
  darkPrimary: string;
  darkSecondary: string;
  darkAccent: string;
  darkBackground: string;
  darkForeground: string;
  darkMuted: string;
  darkMutedFg: string;
  darkBorder: string;
  darkCard: string;
  darkDestructive: string;
  fontFamily: string;
  headingFont: string;
  borderRadius: string;
  navbarStyle: string;
  footerStyle: string;
  productCardStyle: string;
}
