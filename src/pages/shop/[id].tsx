import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, ICategory } from "../../types";
import ProductForm from "../../components/form/ProductForm";
import { env } from "../../env/server.mjs";
import axios from "axios";

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database
  const { data } = await axios.get(
    `${env.API_END_POINT}/api/products/${params.id}`
  );

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  if (data) {
    return {
      props: {
        product: data,
        categories,
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
