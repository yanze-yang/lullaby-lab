import { getSession } from "next-auth/react";
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId: session?.user?.id,
        },
        include: {
          products: true,
        },
      });
      return res.status(200).json(orders);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "POST") {
    try {
      const order = await prisma.order.create({
        data: req.body,
      });
      return res.status(200).json(order);
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

export default products;
