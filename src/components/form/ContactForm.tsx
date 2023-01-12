import React from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import type { IContact } from "../../types";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { InputStyle, LabelStyle } from "./FormStyle";
import type { Prisma } from "@prisma/client";

type Props = {
  contact?: IContact;
  operation: "create" | "update";
};

const ContactForm = ({ contact, operation }: Props) => {
  const { data: session } = useSession();

  type FormValues = {
    name: string;
    wechat: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };

  const defaultValues: FormValues = {
    name: contact?.name || "",
    wechat: contact?.wechat || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    address: contact?.address || "",
    notes: contact?.notes || "",
  };

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues,
  });

  const router = useRouter();
  const redirect = () => {
    setTimeout(() => {
      router.push("/contact");
    }, 1000);
  };

  const onSubmit = (data: FormValues) => {
    if (!session) {
      return;
    }

    if (operation === "update" && contact) {
      const updateData: Prisma.ContactUncheckedUpdateInput = { ...data };
      const update = axios
        .patch(`/api/contacts/${contact.id}`, updateData)
        .then(() => {
          redirect();
        });
      toast.promise(update, {
        loading: "Loading",
        success: "Contact updated",
        error: "Error updating contact",
      });
    } else {
      const createData: Prisma.ContactUncheckedCreateInput = {
        ...data,
        userId: session?.user?.id as string,
      };
      const create = axios.post(`/api/contacts`, createData).then(() => {
        redirect();
      });
      toast.promise(create, {
        loading: "Loading",
        success: "Contact created",
        error: "Error creating contact",
      });
    }
  };
  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            <div>
              <label htmlFor={"name"} className={LabelStyle}>
                Name (optional)
              </label>
              <input
                {...register("name", { required: false })}
                className={InputStyle}
              />
            </div>
            <div>
              <label htmlFor={"wechat"} className={LabelStyle}>
                Wechat (optional)
              </label>
              <input
                {...register("wechat", { required: false })}
                className={InputStyle}
              />
            </div>
            <div>
              <label htmlFor={"phone"} className={LabelStyle}>
                Phone (optional)
              </label>
              <input
                {...register("phone", { required: false })}
                className={InputStyle}
              />
            </div>
            <div>
              <label htmlFor={"address"} className={LabelStyle}>
                address (optional)
              </label>
              <input
                {...register("address", { required: false })}
                className={InputStyle}
              />
            </div>
            <div>
              <label htmlFor={"notes"} className={LabelStyle}>
                Notes (optional)
              </label>
              <input
                {...register("notes", { required: false })}
                className={InputStyle}
              />
            </div>
            <div>
              <label htmlFor={"email"} className={LabelStyle}>
                Email (optional)
              </label>
              <input
                {...register("email", { required: false })}
                className={InputStyle}
              />
            </div>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            {operation === "update" ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
