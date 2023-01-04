import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import type { IProduct } from "../../types";

interface Props {
  product: IProduct;
}

export default function ProductItem({ product }: Props) {
  const router = useRouter();

  const reload = () => {
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const deleteProduct = (id: string) => {
    axios.delete(`/api/products/${id}`);
    reload();
  };

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
      <td className="py-4 px-6 text-right">
        <a
          className="cursor-pointer font-medium text-gray-300 hover:underline dark:text-gray-600"
          onClick={() => deleteProduct(product.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
