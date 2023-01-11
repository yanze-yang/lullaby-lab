import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import type { ICategory, IOrder } from "../../types";
import toast from "react-hot-toast";
import moment from "moment";

interface Props {
  category: ICategory;
}

export default function CategoryList({ category }: Props) {
  const router = useRouter();

  const reload = () => {
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const deleteCategory = (id: string) => {
    // const remove = axios.delete(`/api/orders/${id}`).then(() => {
    //   reload();
    // });
    // toast.promise(remove, {
    //   loading: "Loading",
    //   success: "Product deleted",
    //   error: "Error deleting product",
    // });
  };

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {category.name}
      </th>
      <td className="py-4 px-6"></td>
      <td className="py-4 px-6 text-right">
        {/* <Link
          href={`/order/${order.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link> */}
        <a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
          Edit
        </a>
      </td>
      <td className="py-4 px-6 text-right">
        <a
          className="cursor-pointer font-medium text-gray-300 hover:underline dark:text-gray-600"
          //   onClick={() => deleteOrder(order.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
