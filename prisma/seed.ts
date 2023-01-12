import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  {
    name: "Lemon",
    size: "4 inch",
    code: "LE",
    price: 4.5,
    description:
      "A sweet and tangy macaron filled with a refreshing lemon cream",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Chocolate",
    size: "4 inch",
    code: "CH",
    price: 4.5,
    description:
      "A rich and indulgent macaron filled with a smooth chocolate ganache",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Raspberry",
    size: "4 inch",
    code: "RA",
    price: 4.5,
    description:
      "A fruity and flavorful macaron filled with a tart raspberry jam",
    image: "https://via.placeholder.com/150",
  },
  // {
  //   name: "Pistachio",
  //   size: "4 inch",
  //   code: "PI",
  //   price: 4.5,
  //   description:
  //     "A nutty and fragrant macaron filled with a creamy pistachio buttercream",
  //   image: "https://via.placeholder.com/150",
  // },
  // {
  //   name: "Salted Caramel",
  //   code: "SC",
  //   price: 4.5,
  //   description:
  //     "A sweet and salty macaron filled with a gooey salted caramel sauce",
  //   image: "https://via.placeholder.com/150",
  // },
  // {
  //   name: "Maple",
  //   size: "4 inch",
  //   code: "MA",
  //   price: 4.5,
  //   description:
  //     "A warm and cozy macaron filled with a sweet maple syrup buttercream",
  //   image: "https://via.placeholder.com/150",
  // },
];

async function main() {
  // await prisma.category.upsert({
  //   where: { id: "f139448d-2679-4848-8ede-71c97ef1ab8a" },
  //   update: {
  //     name: "Cake",
  //     products: {
  //       create: products,
  //     },
  //   },
  //   create: {
  //     name: "Cake",
  //     products: {
  //       create: products,
  //     },
  //   },
  // });
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
