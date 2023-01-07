import type { Product, Category, Order } from "@prisma/client";
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

export type ProductFormData = {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
};
