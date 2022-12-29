import type { Product, Category } from "@prisma/client";
import { prisma } from "../../server/db/client";

interface IProduct extends Product {
  category: Category;
}

const ListedHome = (product: IProduct) => {
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

export default ListedHome;
