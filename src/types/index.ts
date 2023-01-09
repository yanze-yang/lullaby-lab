import type { Product, Category, Order, Contact } from "@prisma/client";

export type ICategory = Category & {
  products: Product[];
};

export type IProduct = Product & {
  category: Category;
};

export type IOrder = Order & {
  products: Product[];
};

export type IContact = Contact;

export type ProductFormData = {
  id: string;
  code: string;
  name: string;
  size: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
};

export type OrderFormData = {
  id: string;
  date?: string;
  notes?: string;
  addon?: number;
  contactId?: string;
  products?: Product[];
};
