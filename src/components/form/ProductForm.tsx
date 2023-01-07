import React from "react";
import Navbar from "../layout/Navbar";
import { Field } from "./Field";
import axios from "axios";
import { useRouter } from "next/router";
import type { ProductFormData, IProduct, ICategory } from "../../types";
import { useForm } from "react-hook-form";

import type { Prisma } from "@prisma/client";
import toast from "react-hot-toast";

type Props = {
  product?: IProduct;
  categories: ICategory[];
  codes: string[];
  operation: "create" | "update";
};

export default function ProductForm({
  product,
  categories,
  codes,
  operation,
}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const [isUnique, setIsUnique] = React.useState(true);

  const redirect = () => {
    setTimeout(() => {
      router.push("/shop");
    }, 1000);
  };

  const onSubmit = (data: ProductFormData) => {
    if (operation === "update" && product) {
      // Convert price to number
      data.price = Number(data.price);

      const update = axios
        .patch(`/api/products/${product.id}`, data)
        .then(() => {
          redirect();
        });

      toast.promise(update, {
        loading: "Loading",
        success: "Product updated",
        error: "Error updating product",
      });
      // if has response, redirect
    } else {
      // Convert price to number
      data.price = Number(data.price);
      const product: Prisma.ProductUncheckedCreateInput = {
        ...data,
      };

      const create = axios.post(`/api/products`, product).then(() => {
        redirect();
      });

      toast.promise(create, {
        loading: "Loading",
        success: "Product created",
        error: "Error creating product",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!codes) return;
    // if code is already in the database, show error

    setIsUnique(true);
    if (operation === "create" && codes.includes(e.target.value)) {
      setIsUnique(false);
    }

    if (
      operation === "update" &&
      codes.includes(e.target.value) &&
      product?.code !== e.target.value
    ) {
      setIsUnique(false);
    }
  };

  if (!product && operation === "update") return null;

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            {product && (
              <div>
                <Field
                  label="id"
                  register={register}
                  required={true}
                  defaultValue={product.id}
                  placeholder="Id will be generated automatically"
                  readOnly
                />
              </div>
            )}
            <div>
              <Field
                label="code"
                register={register}
                required={true}
                defaultValue={product?.code}
                placeholder="Create a unique code for your product"
                handleChange={handleChange}
              />
              {errors.code && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              {!isUnique && (
                <span className="text-sm text-red-500">
                  This code is already in use
                </span>
              )}
            </div>
            <div>
              <Field
                label="name"
                register={register}
                required={true}
                defaultValue={product?.name}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="size"
                register={register}
                required={true}
                defaultValue={product?.size}
              />
              {errors.size && (
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
                label="price"
                register={register}
                type="number"
                required={true}
                defaultValue={product?.price}
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
                required={false}
                defaultValue={product?.description?.toString()}
              />
            </div>
            <div>
              <Field
                label="image"
                register={register}
                required={false}
                defaultValue={product?.image?.toString()}
              />
            </div>
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                {...register("categoryId")}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 `}
                defaultValue={product?.categoryId?.toString()}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {operation === "create" ? (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              disabled={!isUnique}
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              disabled={!isUnique}
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
