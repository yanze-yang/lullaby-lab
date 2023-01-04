import React from "react";
import Navbar from "../layout/Navbar";
import { Field } from "./Field";
import axios from "axios";
import { useRouter } from "next/router";
import type { ProductFormData, IProduct } from "../../types";
import { useForm } from "react-hook-form";

type Props = {
  product?: IProduct;
  operation: "create" | "update";
};

export default function CreateProductForm({ product, operation }: Props) {
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
      axios.patch(`/api/products/${product.id}`, data);
      redirect();
    } else {
      axios.post(`/api/products`, data);
      redirect();
    }
  };

  if (!product) return null;

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            <div>
              {product ? (
                <Field
                  label="id"
                  register={register}
                  required={true}
                  defaultValue={product.id}
                  readOnly
                />
              ) : null}
            </div>
            <div>
              <Field
                label="code"
                register={register}
                required={true}
                defaultValue={product && product.code}
                placeholder="Create a unique code for your product"
              />
              {errors.code && <span>This field is required</span>}
            </div>
            <div>
              <Field
                label="name"
                register={register}
                required={true}
                defaultValue={product && product.name}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div>
              <Field
                label="description"
                register={register}
                required={true}
                defaultValue={product && product.description}
              />
              {errors.description && <span>This field is required</span>}
            </div>
            <div>
              <Field
                label="image"
                register={register}
                required={true}
                defaultValue={product && product.image}
              />
              {errors.image && <span>This field is required</span>}
            </div>
          </div>
          {operation === "create" ? (
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
