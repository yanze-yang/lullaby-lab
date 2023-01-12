import React from "react";
import CreateButton from "../../components/button/CreateButton";
import CategoryTable from "../../components/category/CategoryTable";
import DashboardLayout from "../../components/layout/DashboradLayout";
import EmptyContent from "../../components/layout/EmptyContent";
import { prisma } from "../../server/db/client";
import type { ICategory } from "../../types";
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

  const categories = await prisma.category.findMany({
    where: { userId: session.user?.id },
  });

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

const CategoryIndex = ({ categories }: { categories: ICategory[] }) => {
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

export default CategoryIndex;
