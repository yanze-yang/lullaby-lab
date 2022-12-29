import type { Product, Category } from "@prisma/client";

export interface ICategory extends Category {
  products: Product[];
}

export interface IProduct extends Product {
  category: Category;
}
