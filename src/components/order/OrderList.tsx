import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import type { IOrder } from "../../types";
import toast from "react-hot-toast";
import moment from "moment";

interface Props {
  order: IOrder;
}

export default function OrderList({ order }: Props) {
  const router = useRouter();

  const total = () => {
    let total = 0;
    order.products.forEach((product) => {
      total += product.price;
    });

    total += order.addon ? order.addon : 0;
    return total;
  };

  const reload = () => {
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const deleteOrder = (id: string) => {
    const remove = axios.delete(`/api/orders/${id}`).then(() => {
      reload();
    });

    toast.promise(remove, {
      loading: "Loading",
      success: "Product deleted",
      error: "Error deleting product",
    });
  };

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {order.products?.map((product) => {
          return (
            <span
              key={product.id}
              className="mr-2 rounded-md border-2 border-gray-600 p-1.5 text-sm "
            >
              {product.code}{" "}
            </span>
          );
        })}
      </th>
      <td className="py-4 px-6">
        {moment(order.date).format("dddd")},{" "}
        {moment(order.date).format("MMM DD YYYY")}
      </td>
      <td className="py-4 px-6">{order.contactId}</td>
      <td className="py-4 px-6">
        {order.products.map((product) => {
          return (
            <span
              className="mr-2 rounded-md border-2 border-gray-600 p-1.5 text-sm text-gray-600 dark:text-gray-400"
              key={product.id}
            >
              {product.name} | {product.size}
            </span>
          );
        })}
      </td>
      <td className="py-4 px-6">
        {order.products.map((product) => {
          return (
            <span
              className="mr-2 rounded-md border-2 border-gray-600 p-1.5 text-sm text-gray-600 dark:text-gray-400"
              key={product.id}
            >
              {product.size}
            </span>
          );
        })}
      </td>
      <td className="py-4 px-6">$ {total()}</td>
      <td className="py-4 px-6">{order.notes}</td>
      <td className="py-4 px-6">{order.addon}</td>
      <td className="py-4 px-6 text-right">
        <Link
          href={`/order/${order.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </td>
      <td className="py-4 px-6 text-right">
        <a
          className="cursor-pointer font-medium text-gray-300 hover:underline dark:text-gray-600"
          onClick={() => deleteOrder(order.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
