import React from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import type { IProduct, IOrder, ICategory } from "../../types";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

import ReactSelect from "react-select";

import { InputStyle, LabelStyle } from "./FormStyle";
import moment from "moment";
import type { Prisma } from "@prisma/client";

interface IProductOption {
  value: string;
  label: string;
}

type Props = {
  category?: ICategory;
  operation: "create" | "update";
};

const CategoryForm = ({ category, operation }: Props) => {
  type FormValues = {
    name: string;
  };

  const defaultValues: FormValues = {
    name: category?.name || "",
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const router = useRouter();
  const redirect = () => {
    setTimeout(() => {
      router.push("/order");
    }, 1000);
  };

  const onSubmit = (data: FormValues) => {
    if (operation === "update" && category) {
      const updateData: Prisma.CategoryUncheckedUpdateInput = {
        name: data.name,
      };
      const update = axios
        .patch(`/api/categories/${category.id}`, updateData)
        .then(() => {
          redirect();
        });

      toast.promise(update, {
        loading: "Loading",
        success: "Category updated",
        error: "Error updating category",
      });
    } else {
      const createDate: Prisma.CategoryUncheckedUpdateInput = {
        name: data.name,
      };

      const create = axios.post(`/api/categories`, createDate).then(() => {
        redirect();
      });
      toast.promise(create, {
        loading: "Loading",
        success: "Category created",
        error: "Error creating category",
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
                Name *
              </label>
              <input
                {...register("name", { required: false })}
                className={InputStyle}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
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

export default CategoryForm;
