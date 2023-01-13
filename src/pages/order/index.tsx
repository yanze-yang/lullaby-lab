import React from "react";
import CreateButton from "../../components/button/CreateButton";
import DashboardLayout from "../../components/layout/DashboradLayout";
import EmptyContent from "../../components/layout/EmptyContent";
import OrderTable from "../../components/order/OrderTable";
import { prisma } from "../../server/db/client";
import type { IOrder } from "../../types";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: GetSessionParams) {
  // Check if user is authenticated
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user?.id },
    include: {
      products: true,
      contact: true,
    },
  });

  // sort by created_at
  orders.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

const OrderIndex = ({ orders }: { orders: IOrder[] }) => {
  return (
    <DashboardLayout>
      {orders.length > 0 ? (
        <OrderTable orders={orders} />
      ) : (
        <EmptyContent>
          No orders yet. Create one by clicking the + button below.
        </EmptyContent>
      )}
      <CreateButton />
    </DashboardLayout>
  );
};

export default OrderIndex;
