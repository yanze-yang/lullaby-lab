import React from "react";
import { useForm } from "react-hook-form";
import { prisma } from "../../server/db/client";
import type { IProduct, ProductFormData } from "../../types";
import { Field } from "../../components/form/Field";

const List = (product: IProduct) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const onSubmit = (data: ProductFormData) => {
    console.log(data);
  };

  if (!product) return null;

  return (
    <div className="mx-auto max-w-4xl">
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
