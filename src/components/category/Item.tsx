import React from "react";
import type { ICategory } from "../../types";
import Link from "next/link";

interface Props {
  category: ICategory;
}

export default function Item({ category }: Props) {
  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {category.name}
      </th>
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {category.products.length}
      </th>
      <td className="py-4 px-6 text-right">
        <Link
          href={`/category/${category.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
