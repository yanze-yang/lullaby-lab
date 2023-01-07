import React from "react";
import Item from "../../components/category/Item";
import Navbar from "../../components/layout/Navbar";
import { prisma } from "../../server/db/client";
import type { ICategory } from "../../types";

// get current router path

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

export default function CategoryIndex({
  categories,
}: {
  categories: ICategory[];
}) {
  if (categories.length === 0) return <div>loading...</div>;
  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="relative m-6 overflow-x-auto shadow-md sm:rounded-3xl">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Category name
              </th>
              <th scope="col" className="py-3 px-6">
                Products count
              </th>

              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <Item key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
