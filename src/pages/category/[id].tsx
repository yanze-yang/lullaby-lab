import React from "react";
import { prisma } from "../../server/db/client";
import type { ICategory } from "../../types";
import CategoryForm from "../../components/form/CategoryForm";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (category) {
    return {
      props: {
        category: JSON.parse(JSON.stringify(category)),
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
  const categories = await prisma.category.findMany({
    select: { id: true },
  });

  return {
    paths: categories.map((category) => ({
      params: { id: category.id },
    })),
    fallback: true,
  };
}

const EditCategory = ({ category }: { category: ICategory }) => {
  if (!category) return null;
  return <CategoryForm operation="update" category={category} />;
};

export default EditCategory;
