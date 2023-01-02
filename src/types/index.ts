import type { Product, Category } from "@prisma/client";

export type ICategory = Category & {
  products: Product[];
};

export type IProduct = Product & {
  category: Category;
};

export type ProductFormData = {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string;
  image: string;
};
