import React from "react";
import type { IProduct } from "../../types";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
import ProductTable from "../../components/shop/ProductTable";
import Searchbar from "../../components/shop/Searchbar";

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  // sort by created_at
  products.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default function ShopIndex({ products }: { products: IProduct[] }) {
  if (products.length === 0)
    return (
      <div className="h-[100vh] dark:bg-gray-900">
        <Navbar />
        <Searchbar />
        <div className="text-center text-2xl text-gray-500 dark:text-gray-400">
          No products found
        </div>
      </div>
    );

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <Searchbar />
      <ProductTable products={products} />
    </div>
  );
}
