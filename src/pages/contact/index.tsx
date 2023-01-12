import React from "react";
import type { IContact } from "../../types";
import { prisma } from "../../server/db/client";
// import ProductTable from "../../components/product/ProductTable";
import EmptyContent from "../../components/layout/EmptyContent";
import ContactTable from "../../components/contanct/ContactTable";
import DashboardLayout from "../../components/layout/DashboradLayout";
import CreateButton from "../../components/button/CreateButton";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const contacts = await prisma.contact.findMany({
    where: { userId: session.user?.id },
  });

  // sort by created_at
  contacts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  return {
    props: {
      contacts: JSON.parse(JSON.stringify(contacts)),
    },
  };
}

export default function ContactIndex({ contacts }: { contacts: IContact[] }) {
  return (
    <DashboardLayout>
      {contacts.length > 0 ? (
        <ContactTable contacts={contacts} />
      ) : (
        <EmptyContent>No contacts found</EmptyContent>
      )}
      <CreateButton />
    </DashboardLayout>
  );
}
