import React from "react";
import type { IProduct } from "../../types";

import { prisma } from "../../server/db/client";
import ProductTable from "../../components/product/ProductTable";
import EmptyContent from "../../components/layout/EmptyContent";
import DashboardLayout from "../../components/layout/DashboradLayout";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";
import CreateButton from "../../components/button/CreateButton";

export async function getServerSideProps(context: GetSessionParams) {
  // Check if user is authenticated
  const session = await getSession(context);
  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const products = await prisma.product.findMany({
    where: { userId: session.user?.id },
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
      <CreateButton />
    </DashboardLayout>
  );
}
