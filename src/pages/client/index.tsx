import React from "react";
import type { IClient } from "../../types";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
import ProductTable from "../../components/shop/ProductTable";
import EmptyContent from "../../components/layout/EmptyContent";

export async function getServerSideProps() {
  const clients = await prisma.client.findMany();

  // sort by created_at
  clients.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  return {
    props: {
      clients: JSON.parse(JSON.stringify(clients)),
    },
  };
}

export default function ClientIndex({ clients }: { clients: IClient[] }) {
  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      {clients.length > 0 ? (
        // <ProductTable clients={clients} />
        <></>
      ) : (
        <EmptyContent>No client found</EmptyContent>
      )}
    </div>
  );
}
