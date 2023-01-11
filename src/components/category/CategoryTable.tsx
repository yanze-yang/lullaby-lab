import React from "react";
import type { ICategory } from "../../types";
import CategoryList from "./CategoryList";

const CategoryTable = ({ categories }: { categories: ICategory[] }) => {
  return (
    <>
      <div className="relative m-6 overflow-x-auto shadow-md sm:rounded-3xl">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>

              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => (
              <OrderList key={order.id} order={order} />
            ))} */}
            {categories.map((category) => (
              <CategoryList key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
