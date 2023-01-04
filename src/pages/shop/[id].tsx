import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct } from "../../types";
import CreateProductForm from "../../components/form/ProductForm";
import { env } from "../../env/server.mjs";
import axios from "axios";

const List = (product: IProduct) => {
  if (!product) return null;

  return <CreateProductForm product={product} operation="update" />;
};

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

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database
  const { data } = await axios.get(
    `${env.API_END_POINT}/api/products/${params.id}`
  );

  if (data) {
    return {
      props: data,
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default List;
