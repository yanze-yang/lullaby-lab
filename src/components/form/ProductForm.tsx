import React from "react";
import Navbar from "../layout/Navbar";
import { Field } from "./Field";
import axios from "axios";
import { useRouter } from "next/router";
import type { ProductFormData, IProduct } from "../../types";
import { useForm } from "react-hook-form";

import type { Prisma } from "@prisma/client";

type Props = {
  product?: IProduct;
  operation: "create" | "update";
};

export default function ProductForm({ product, operation }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const redirect = () => {
    setTimeout(() => {
      router.push("/shop");
    }, 1000);
  };

  const onSubmit = (data: ProductFormData) => {
    if (operation === "update" && product) {
      // Convert price to number
      data.price = Number(data.price);

      axios.patch(`/api/products/${product.id}`, data);
      redirect();
    } else {
      // Convert price to number
      data.price = Number(data.price);

      const product: Prisma.ProductUncheckedCreateInput = {
        ...data,
        categoryId: "151f1b59-68e6-4c97-81a8-fea553b1c27b",
      };

      axios.post(`/api/products`, product);
      redirect();
    }
  };

  if (!product && operation === "update") return null;

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            {product ? (
              <div>
                <Field
                  label="id"
                  register={register}
                  required={true}
                  defaultValue={product.id}
                  readOnly
                />
              </div>
            ) : null}
            <div>
              <Field
                label="code"
                register={register}
                required={true}
                defaultValue={product && product.code}
                placeholder="Create a unique code for your product"
              />
              {errors.code && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="name"
                register={register}
                required={true}
                defaultValue={product && product.name}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="price"
                register={register}
                type="number"
                required={true}
                defaultValue={product && product.price}
              />
              {errors.price && (
                <span
                  className="
                text-sm text-red-500
              "
                >
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="description"
                register={register}
                required={true}
                defaultValue={product && product.description}
              />
              {errors.description && (
                <span
                  className="
                text-sm text-red-500
              "
                >
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="image"
                register={register}
                required={true}
                defaultValue={product && product.image}
              />
              {errors.image && (
                <span
                  className="
                text-sm text-red-500
              "
                >
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="categoryId"
                register={register}
                required={true}
                defaultValue={product && product.categoryId}
              />
            </div>
          </div>
          {operation === "create" ? (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
