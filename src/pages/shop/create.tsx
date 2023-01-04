import React from "react";
import CreateProductForm from "../../components/form/ProductForm";
import type { ICategory } from "../../types";
import { prisma } from "../../server/db/client";

export async function getStaticProps() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  if (categories) {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
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

export default function Create({ categories }: { categories: ICategory[] }) {
  return <CreateProductForm operation="create" categories={categories} />;
}
