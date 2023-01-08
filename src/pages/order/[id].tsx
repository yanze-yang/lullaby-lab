import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, ICategory, IOrder } from "../../types";
import ProductForm from "../../components/form/ProductForm";
import OrderForm from "../../components/form/OrderForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database use prisma
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      products: true,
    },
  });

  const products = await prisma.product.findMany();

  //   // get all the codes from the products and put them in an array
  //   const productsWithCode = await prisma.product.findMany({
  //     select: { code: true },
  //   });
  //   const codes = productsWithCode.map((product) => product.code);

  //   const categories = await prisma.category.findMany({
  //     select: { id: true, name: true },
  //   });
  console.log("products", products);

  if (order) {
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
        products: JSON.parse(JSON.stringify(products)),
        // categories: JSON.parse(JSON.stringify(categories)),
        // codes: codes,
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
  const orders = await prisma.order.findMany({
    select: { id: true },
  });

  return {
    paths: orders.map((order) => ({
      params: { id: order.id },
    })),
    fallback: true,
  };
}

const EditOrder = ({
  order,
  products,
}: //   categories,
//   codes,
{
  order: IOrder;
  products: IProduct[];
  //   categories: ICategory[];
  //   codes: string[];
}) => {
  if (!order) return null;
  return <OrderForm order={order} products={products} operation="update" />;
};

export default EditOrder;
