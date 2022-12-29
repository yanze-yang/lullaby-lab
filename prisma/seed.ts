import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  {
    name: "Macaron 1",
    price: 10.99,
    description: "Delicious macaron 1",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Macaron 2",
    price: 20.99,
    description: "Delicious macaron 2",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Macaron 3",
    price: 30.99,
    description: "Delicious macaron 3",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Macaron 4",
    price: 40.99,
    description: "Delicious macaron 4",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Macaron 5",
    price: 50.99,
    description: "Delicious macaron 5",
    image: "https://via.placeholder.com/150",
  },
];

async function main() {
  await prisma.category.upsert({
    where: { id: "99c7020e-1e97-41fd-8dc4-570e4d82fbf9" },
    update: {
      name: "Macaron",
      products: {
        create: products,
      },
    },
    create: {
      name: "Macaron",
      products: {
        create: products,
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
