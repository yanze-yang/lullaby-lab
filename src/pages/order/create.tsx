import React from "react";
import { prisma } from "../../server/db/client";
import type { IContact, IProduct } from "../../types";
import OrderForm from "../../components/form/OrderForm";
import { getSession } from "next-auth/react";

export async function getStaticProps() {
  const session = await getSession();
  let products = [];

  if (session) {
    products = await prisma.product.findMany({
      where: { userId: session?.user?.id },
    });
  } else {
    products = await prisma.product.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
    });
  }

  let contacts = [];

  if (session) {
    contacts = await prisma.contact.findMany({
      where: { userId: session?.user?.id },
      select: { id: true, name: true },
    });
  } else {
    contacts = await prisma.contact.findMany({
      where: { userId: "clcsa1guq000008mo3tdn1r0e" },
      select: { id: true, name: true },
    });
  }

  if (products && contacts) {
    return {
      props: {
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

const CreateOrder = ({
  products,
  contacts,
}: {
  products: IProduct[];
  contacts: IContact[];
}) => {
  return (
    <OrderForm products={products} contacts={contacts} operation="create" />
  );
};

export default CreateOrder;
