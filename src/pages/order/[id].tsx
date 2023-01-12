import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, IOrder } from "../../types";
import { getSession } from "next-auth/react";
import OrderForm from "../../components/form/OrderForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const session = await getSession();
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      products: true,
    },
  });

  const products = await prisma.product.findMany({
    where: { userId: session?.user?.id },
  });

  if (order) {
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
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
}: {
  order: IOrder;
  products: IProduct[];
}) => {
  if (!order) return null;
  return <OrderForm order={order} products={products} operation="update" />;
};

export default EditOrder;
