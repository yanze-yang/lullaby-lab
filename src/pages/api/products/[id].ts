import { prisma } from "../../../server/db/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const product = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { id } = req.query;
  // narrows the type of id to string
  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid id" });

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return res.status(200).json(product);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Update product
  if (req.method === "PATCH") {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          ...req.body,
        },
      });
      return res.status(200).json(product);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const product = await prisma.product.delete({
        where: { id },
      });
      return res.status(200).json(product);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
};

export default product;
