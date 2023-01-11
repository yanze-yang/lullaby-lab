import type { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const categories = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (req.method === "POST") {
    const data: Prisma.CategoryCreateInput = req.body;

    try {
      const category = await prisma.category.create({
        data,
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
