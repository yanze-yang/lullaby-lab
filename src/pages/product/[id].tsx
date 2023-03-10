import React from "react";
import { prisma } from "../../server/db/client";
import type { IProduct, ICategory } from "../../types";
import ProductForm from "../../components/form/ProductForm";
import DashboardLayout from "../../components/layout/DashboradLayout";
import { getSession } from "next-auth/react";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const session = await getSession();
  // Get the current product from the database use prisma
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
    },
  });

  // get all the codes from the products and put them in an array
  const productsWithCode = await prisma.product.findMany({
    where: { userId: session?.user?.id },
    select: { code: true },
  });
  const codes = productsWithCode.map((product) => product.code);

  const categories = await prisma.category.findMany({
    where: { userId: session?.user?.id },
    select: { id: true, name: true },
  });

  if (product) {
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        categories: JSON.parse(JSON.stringify(categories)),
        codes: codes,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export async function getStaticPaths() {
  const products = await prisma.product.findMany({
    select: { id: true },
  });

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: true,
  };
}

const List = ({
  product,
  categories,
  codes,
}: {
  product: IProduct;
  categories: ICategory[];
  codes: string[];
}) => {
  if (!product) return null;
  return (
    <DashboardLayout>
      <ProductForm
        product={product}
        categories={categories}
        codes={codes}
        operation="update"
      />
    </DashboardLayout>
  );
};

export default List;
