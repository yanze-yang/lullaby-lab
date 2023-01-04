import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const categories = async (req: NextApiRequest, res: NextApiResponse) => {
  // get all categories
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products: true,
        },
      });

      return res.status(200).json(categories);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Ctrete category
  if (req.method === "POST") {
    try {
      const category = await prisma.category.create({
        data: req.body,
      });
      return res.status(200).json(category);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST", "GET"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default categories;
