import { prisma } from "../../server/db/client";
import type { IProduct } from "../../types";

const List = (product: IProduct) => {
  if (!product) return null;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const categories = await prisma.category.findMany({
    select: { id: true },
  });

  return {
    paths: categories.map((category) => ({
      params: { id: category.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Get the current product from the database
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (category) {
    return {
      props: JSON.parse(JSON.stringify(category)),
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
