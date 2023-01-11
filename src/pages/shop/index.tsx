import React from "react";
import type { IProduct } from "../../types";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
import ProductTable from "../../components/shop/ProductTable";
import EmptyContent from "../../components/layout/EmptyContent";
import DashboardLayout from "../../components/layout/DashboradLayout";

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
  return (
    <DashboardLayout>
      {products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <EmptyContent>No products found</EmptyContent>
      )}
    </DashboardLayout>
  );
}
