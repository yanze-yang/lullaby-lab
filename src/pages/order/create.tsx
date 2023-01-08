import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct } from "../../types";
import OrderForm from "../../components/form/OrderForm";

export async function getStaticProps() {
  const products = await prisma.product.findMany();

  if (products) {
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
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

const CreateOrder = ({ products }: { products: IProduct[] }) => {
  return <OrderForm products={products} operation="create" />;
};

export default CreateOrder;
