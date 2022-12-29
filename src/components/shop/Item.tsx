import React from "react";
import type { Product, Category } from "@prisma/client";
import Link from "next/link";

interface IProduct extends Product {
  category: Category;
}

interface Props {
  product: IProduct;
}

export default function Item({ product }: Props) {
  return (
    <tr className="hover:bg-gray-50border-gray-700bg-gray-800hover:bg-gray-600 border-b bg-white">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-3"
            type="checkbox"
            className="focus:ring-blue-500border-gray-600bg-gray-700ring-offset-gray-800focus:ring-blue-600 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
          />
          <label htmlFor="checkbox-table-3" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="text-gray-900text-white whitespace-nowrap py-4 px-6 font-medium"
      >
        {product.name}
      </th>
      <td className="py-4 px-6">Silver</td>
      <td className="py-4 px-6">{product.category.name}</td>
      <td className="py-4 px-6">${product.price}</td>
      <td className="py-4 px-6">
        <Link
          href={`/shop/${product.id}`}
          className="hover:underlinetext-blue-500 font-medium text-blue-600"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
