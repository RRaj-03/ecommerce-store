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
