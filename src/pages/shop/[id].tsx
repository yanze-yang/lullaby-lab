import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, ICategory } from "../../types";
import ProductForm from "../../components/form/ProductForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database use prisma
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  if (product) {
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
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

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

const List = ({
  product,
  categories,
}: {
  product: IProduct;
  categories: ICategory[];
}) => {
  if (!product) return null;
  return (
    <ProductForm product={product} categories={categories} operation="update" />
  );
};

export default List;
