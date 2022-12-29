import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const categories = async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  res.status(200).json(categories);
};

export default categories;
