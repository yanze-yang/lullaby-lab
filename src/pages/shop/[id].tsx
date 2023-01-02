import React from "react";
import { useForm } from "react-hook-form";
import { prisma } from "../../server/db/client";
import type { IProduct, ProductFormData } from "../../types";
import { Field } from "../../components/form/Field";
import Navbar from "../../components/layout/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

const List = (product: IProduct) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const onSubmit = (data: ProductFormData) => {
    axios.patch(`/api/products/${product.id}`, data);
    router.push("/shop");
  };

  if (!product) return null;

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            <div>
              <Field
                label="id"
                register={register}
                required={true}
                defaultValue={product.id}
                readOnly
              />
            </div>
            <div>
              <Field
                label="code"
                register={register}
                required={true}
                defaultValue={product.code}
                readOnly
              />
            </div>
            <div>
              <Field
                label="name"
                register={register}
                required={true}
                defaultValue={product.name}
              />
            </div>
            <div>
              <Field
                label="description"
                register={register}
                required={true}
                defaultValue={product.description}
              />
              {errors.description && <span>This field is required</span>}
            </div>
            <div>
              <Field
                label="image"
                register={register}
                required={true}
                defaultValue={product.image}
              />
              {errors.image && <span>This field is required</span>}
            </div>
          </div>
          {/* <div className="mb-6">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required>
    </div>  */}
          {/* <div className="mb-6">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
    </div> 
    <div className="mb-6">
        <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
    </div> 
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
        </div>
        <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div> */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        </form>

        {/* <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Field
              label="id"
              register={register}
              required={true}
              readOnly
              defaultValue={product.id}
            />
          </div>
          <div className="mb-6">
            <Field
              label="name"
              register={register}
              required={true}
              defaultValue={product.name}
            />
          </div>
          <div className="mb-6">
            <Field
              label="price"
              register={register}
              required={true}
              defaultValue={product.price}
            />
            {errors.price && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <Field
              label="description"
              register={register}
              required={true}
              defaultValue={product.description}
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <Field
              label="image"
              register={register}
              required={true}
              defaultValue={product.image}
            />
            {errors.image && <span>This field is required</span>}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div> */}
      </div>
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
