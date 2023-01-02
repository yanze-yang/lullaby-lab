import React from "react";
import Link from "next/link";
import type { IProduct } from "../../types";

interface Props {
  product: IProduct;
}

export default function Item({ product }: Props) {
  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {product.code}
      </th>
      <td className="py-4 px-6">{product.name}</td>
      <td className="py-4 px-6">{product.description}</td>
      <td className="py-4 px-6">{product.category.name}</td>
      <td className="py-4 px-6">{product.price}</td>
      <td className="py-4 px-6">{product.image}</td>
      <td className="py-4 px-6 text-right">
        <Link
          href={`/shop/${product.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
