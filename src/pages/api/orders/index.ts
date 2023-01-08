import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  // Update product
  console.log("data", req.body);
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

  // get all products
  if (req.method === "GET") {
    // try {
    //   const products = await prisma.product.findMany({
    //     include: {
    //       category: true,
    //     },
    //   });
    //   return res.status(200).json(products);
    // } catch (e) {
    //   return res.status(500).json({ message: "Something went wrong" });
    // }
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
