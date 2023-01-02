import { prisma } from "../../../server/db/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const product = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // narrows the type of id to string
  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid id" });

  // Update product
  if (req.method === "PATCH") {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: req.body,
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const product = await prisma.product.delete({
        where: { id },
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["PATCH"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default product;
