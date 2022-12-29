import type { Product, Category } from "@prisma/client";

export type ICategory = Category & {
  products: Product[];
};

export type IProduct = Product & {
  category: Category;
};
