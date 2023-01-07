import React from "react";
import Navbar from "../../components/layout/Navbar";
import OrderTable from "../../components/order/OrderTable";
import { prisma } from "../../server/db/client";
import type { IOrder } from "../../types";

export async function getServerSideProps() {
  const orders = await prisma.order.findMany({
    include: {
      products: true,
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
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      {/* <ProductTable products={products} /> */}
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrderIndex;
