import React from "react";
import { prisma } from "../../server/db/client";
import type { IContact, IProduct } from "../../types";
import OrderForm from "../../components/form/OrderForm";
import { getSession } from "next-auth/react";

export async function getStaticProps() {
  const session = await getSession();
  const products = await prisma.product.findMany({
    where: { userId: session?.user?.id },
  });

  const contacts = await prisma.contact.findMany({
    where: { userId: session?.user?.id },
    select: { id: true, name: true },
  });

  if (products) {
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
