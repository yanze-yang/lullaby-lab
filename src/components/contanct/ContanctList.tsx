import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import type { IContact } from "../../types";
import toast from "react-hot-toast";

interface Props {
  contact: IContact;
}

export default function ContactList({ contact }: Props) {
  const router = useRouter();

  const reload = () => {
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  const deleteContact = (id: string) => {
    const remove = axios.delete(`/api/contacts/${id}`).then(() => {
      reload();
    });

    toast.promise(remove, {
      loading: "Loading",
      success: "Contact deleted",
      error: "Error deleting contact",
    });
  };

  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <th
        scope="row"
        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
      >
        {contact.name}
      </th>
      <td className="py-4 px-6">{contact.wechat}</td>
      <td className="py-4 px-6">{contact.phone}</td>
      <td className="py-4 px-6">{contact.address}</td>
      <td className="py-4 px-6">{contact.notes}</td>
      <td className="py-4 px-6">{contact.email}</td>
      <td className="py-4 px-6 text-right">
        <Link
          href={`/contact/${contact.id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Edit
        </Link>
      </td>
      <td className="py-4 px-6 text-right">
        <a
          className="cursor-pointer font-medium text-gray-300 hover:underline dark:text-gray-600"
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
