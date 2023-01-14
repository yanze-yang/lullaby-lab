import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, IOrder, IContact } from "../../types";
import { getSession, GetSessionParams, useSession } from "next-auth/react";
import OrderForm from "../../components/form/OrderForm";
import type { GetServerSidePropsContext } from "next/types";
import { GetServerSideProps } from "next/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { params } = context;

  let products: any;
  let contacts: any;

  const order = await prisma.order.findUnique({
    where: { id: params?.id as string },
    include: {
      products: true,
      contact: true,
    },
  });

  if (session) {
    products = await prisma.product.findMany({
      where: { userId: session?.user?.id },
    });

    contacts = await prisma.contact.findMany({
      where: { userId: session?.user?.id },
      select: { id: true, name: true },
    });
  } else {
    products = await prisma.product.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
    });

    contacts = await prisma.contact.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
      select: { id: true, name: true },
    });
  }

  if (order && products && contacts) {
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

const EditOrder = ({
  order,
  products,
  contacts,
}: {
  order: IOrder;
  products: IProduct[];
  contacts: IContact[];
}) => {
  // if (!order) return null;
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
