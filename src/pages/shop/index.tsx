import React from "react";
import type { IProduct } from "../../types";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
import ProductTable from "../../components/shop/ProductTable";

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
  if (products.length === 0) return <div>loading...</div>;

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar page="shop" />
      <ProductTable products={products} />
    </div>
  );
}
