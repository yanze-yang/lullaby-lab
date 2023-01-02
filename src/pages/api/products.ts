import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  console.log("products", products);
  res.status(200).json(products);
};

export default products;
