import React from "react";
import type { IContact } from "../../types";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
// import ProductTable from "../../components/shop/ProductTable";
import EmptyContent from "../../components/layout/EmptyContent";
import ContactTable from "../../components/contanct/ContactTable";

export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();

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
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      {contacts.length > 0 ? (
        <ContactTable contacts={contacts} />
      ) : (
        <EmptyContent>No contacts found</EmptyContent>
      )}
    </div>
  );
}
