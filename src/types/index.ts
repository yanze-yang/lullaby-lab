import type { Product, Category, Order, Client } from "@prisma/client";
import { type } from "os";

export type ICategory = Category & {
  products: Product[];
};

export type IProduct = Product & {
  category: Category;
};

export type IOrder = Order & {
  products: Product[];
};

export type IClient = Client;

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
  clientId?: string;
  products?: Product[];
};
