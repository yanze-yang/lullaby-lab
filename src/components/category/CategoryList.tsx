import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import type { ICategory } from "../../types";
import toast from "react-hot-toast";

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
    const remove = axios.delete(`/api/categories/${id}`).then(() => {
      reload();
    });
    toast.promise(remove, {
      loading: "Loading",
      success: "Category deleted",
      error: "Error deleting category",
    });
  };

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {category.name}
      </th>
      {/* <td className="py-4 px-6"></td> */}
      <td className="py-4 px-6 text-right">
        <Link
          href={`/category/${category.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </td>
      <td className="py-4 px-6 text-right">
        <a
          className="cursor-pointer font-medium text-gray-300 hover:underline dark:text-gray-600"
          onClick={() => deleteCategory(category.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
