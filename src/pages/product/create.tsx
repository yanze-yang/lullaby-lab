import React from "react";
import ProductForm from "../../components/form/ProductForm";
import type { ICategory } from "../../types";
import { prisma } from "../../server/db/client";
import DashboardLayout from "../../components/layout/DashboradLayout";

import { getSession } from "next-auth/react";
export async function getStaticProps() {
  const session = await getSession();

  const categories = await prisma.category.findMany({
    where: { userId: session?.user?.id },
    select: { id: true, name: true },
  });

  // get all the codes from the products and put them in an array
  const productsWithCode = await prisma.product.findMany({
    where: { userId: session?.user?.id },
    select: { code: true },
  });
  const codes = productsWithCode.map((product) => product.code);

  if (categories && codes) {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        codes,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default function Create({
  categories,
  codes,
}: {
  categories: ICategory[];
  codes: string[];
}) {
  return (
    <DashboardLayout>
      <ProductForm operation="create" categories={categories} codes={codes} />
    </DashboardLayout>
  );
}
