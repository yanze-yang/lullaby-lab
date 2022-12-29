import React from "react";
import { useForm } from "react-hook-form";
import { prisma } from "../../server/db/client";
import type { IProduct } from "../../types";

type FormData = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const List = (product: IProduct) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  console.log(watch("name"));
  // your form submit function which will invoke after successful validation
  if (!product) return null;

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="idx"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            ID
          </label>
          <input
            id="idx"
            defaultValue={product.id}
            readOnly
            {...register("id", {
              required: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.id && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Name{" "}
          </label>
          <input
            id="name"
            defaultValue={product.name}
            {...register("name", {
              required: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Price
          </label>
          <input
            id="price"
            defaultValue={product.price}
            {...register("price", {
              required: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <input
            id="description"
            defaultValue={product.description}
            {...register("description", {
              required: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Image
          </label>
          <input
            id="image"
            defaultValue={product.image}
            {...register("image", {
              required: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.image && <span>This field is required</span>}
        </div>

        {/* <div className="mb-6">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  </div>
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
    </div>
    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button> */}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (product) {
    return {
      props: JSON.parse(JSON.stringify(product)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default List;
