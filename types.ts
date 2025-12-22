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
  isFeatured: boolean;
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

  orderItems: {
    product: Product;
  }[];
  isPaid: boolean;
  createdAt: Date;
}

export interface Image {
  id: string;
  url: string;
}
