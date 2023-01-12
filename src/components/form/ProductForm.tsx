import React from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import type { IProduct, ICategory } from "../../types";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { InputStyle, LabelStyle } from "./FormStyle";
import type { Prisma } from "@prisma/client";
import { getSession } from "next-auth/react";

type Props = {
  product?: IProduct;
  categories: ICategory[];
  codes: string[];
  operation: "create" | "update";
};

const ProductForm = ({ product, categories, codes, operation }: Props) => {
  const [isUnique, setIsUnique] = React.useState(true);

  type FormValues = {
    code: string;
    name: string;
    size: string;
    price: string;
    description: string;
    image: string;
    categoryId: string;
  };

  const defaultValues: FormValues = {
    code: product?.code || "",
    name: product?.name || "",
    size: product?.size || "",
    price: product?.price.toString() || "",
    description: product?.description || "",
    image: product?.image || "",
    categoryId: product?.category?.id || categories[0]?.id || "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const router = useRouter();
  const redirect = () => {
    setTimeout(() => {
      router.push("/product");
    }, 1000);
  };

  const onSubmit = async (data: FormValues) => {
    const session = await getSession();
    if (!session || !session.user) return;

    if (operation === "update" && product) {
      const updateProductData: Prisma.ProductUncheckedUpdateInput = {
        ...data,
        categoryId: data.categoryId === "" ? null : data.categoryId,
        price: Number(data.price),
      };

      const update = axios
        .patch(`/api/products/${product.id}`, updateProductData)
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

      const product: Prisma.ProductUncheckedCreateInput = {
        ...data,
        categoryId: data.categoryId === "" ? null : data.categoryId,
        price: Number(data.price),
        userId: session?.user?.id,
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
  return (
    <div className="mx-auto my-6 max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 grid  gap-6 md:grid-cols-2">
          {/* Notes field */}
          <div>
            <label htmlFor={"code"} className={LabelStyle}>
              Code *
            </label>
            <input
              {...register("code", { required: true })}
              className={InputStyle}
              onChange={handleChange}
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
            <label htmlFor={"name"} className={LabelStyle}>
              Name *
            </label>
            <input
              {...register("name", { required: true })}
              className={InputStyle}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor={"size"} className={LabelStyle}>
              Size *
            </label>
            <input
              {...register("size", { required: true })}
              className={InputStyle}
            />
            {errors.size && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor={"price"} className={LabelStyle}>
              Price *
            </label>
            <input
              {...register("price", { required: true })}
              className={InputStyle}
              type="number"
            />
            {errors.price && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor={"description"} className={LabelStyle}>
              Description (optional)
            </label>
            <input
              {...register("price", { required: false })}
              className={InputStyle}
            />
          </div>
          <div>
            <label htmlFor={"image"} className={LabelStyle}>
              Image (optional)
            </label>
            <input
              {...register("image", { required: false })}
              className={InputStyle}
            />
          </div>
          <div>
            <label htmlFor={"categoryId"} className={LabelStyle}>
              Category (optional)
            </label>
            <select
              {...register("categoryId")}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 `}
              // defaultValue={product?.categoryId?.toString()}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          disabled={!isUnique}
        >
          {operation === "update" ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};
export default ProductForm;
