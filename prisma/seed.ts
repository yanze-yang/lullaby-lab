import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  {
    name: "Lemon",
    code: "LE",
    price: 4.5,
    description:
      "A sweet and tangy macaron filled with a refreshing lemon cream",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Chocolate",
    code: "CH",
    price: 4.5,
    description:
      "A rich and indulgent macaron filled with a smooth chocolate ganache",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Raspberry",
    code: "RA",
    price: 4.5,
    description:
      "A fruity and flavorful macaron filled with a tart raspberry jam",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Pistachio",
    code: "PI",
    price: 4.5,
    description:
      "A nutty and fragrant macaron filled with a creamy pistachio buttercream",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Salted Caramel",
    code: "SC",
    price: 4.5,
    description:
      "A sweet and salty macaron filled with a gooey salted caramel sauce",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Maple",
    code: "MA",
    price: 4.5,
    description:
      "A warm and cozy macaron filled with a sweet maple syrup buttercream",
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
