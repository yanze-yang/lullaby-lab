import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, IOrder, IContact } from "../../types";
import { getSession } from "next-auth/react";
import OrderForm from "../../components/form/OrderForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const session = await getSession();
  let order: any = [];
  let products = [];
  let contacts = [];

  if (session) {
    order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        products: true,
        contact: true,
      },
    });

    products = await prisma.product.findMany({
      where: { userId: session?.user?.id },
    });

    contacts = await prisma.contact.findMany({
      where: { userId: session?.user?.id },
      select: { id: true, name: true },
    });
  } else {
    order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        products: true,
        contact: true,
      },
    });

    products = await prisma.product.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
    });

    contacts = await prisma.contact.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
      select: { id: true, name: true },
    });
  }

  // const order = await prisma.order.findUnique({
  //   where: { id: params.id },
  //   include: {
  //     products: true,
  //     contact: true,
  //   },
  // });

  // const products = await prisma.product.findMany({
  //   where: { userId: session?.user?.id },
  // });

  // const contacts = await prisma.contact.findMany({
  //   where: { userId: session?.user?.id },
  //   select: { id: true, name: true },
  // });

  if (order) {
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
        products: JSON.parse(JSON.stringify(products)),
        contacts: JSON.parse(JSON.stringify(contacts)),
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
  contacts,
}: {
  order: IOrder;
  products: IProduct[];
  contacts: IContact[];
}) => {
  if (!order) return null;
  return (
    <OrderForm
      order={order}
      products={products}
      contacts={contacts}
      operation="update"
    />
  );
};

export default EditOrder;
