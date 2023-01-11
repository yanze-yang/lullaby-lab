import React from "react";
import CreateButton from "../../components/button/CreateButton";
import CategoryTable from "../../components/category/CategoryTable";
import DashboardLayout from "../../components/layout/DashboradLayout";
import EmptyContent from "../../components/layout/EmptyContent";
import { prisma } from "../../server/db/client";
import type { ICategory } from "../../types";

export async function getServerSideProps() {
  const categories = await prisma.category.findMany();

  // sort by created_at
  categories.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

const OrderIndex = ({ categories }: { categories: ICategory[] }) => {
  return (
    <DashboardLayout>
      {categories.length > 0 ? (
        <CategoryTable categories={categories} />
      ) : (
        <EmptyContent>No categories found</EmptyContent>
      )}
      <CreateButton />
    </DashboardLayout>
  );
};

export default OrderIndex;
