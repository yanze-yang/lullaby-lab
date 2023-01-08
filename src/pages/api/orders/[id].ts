import { prisma } from "../../../server/db/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import moment from "moment";

const product = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // narrows the type of id to string
  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid id" });

  // get product by id
  if (req.method === "GET") {
    // try {
    //   const product = await prisma.product.findUnique({
    //     where: { id },
    //     include: {
    //       category: true,
    //     },
    //   });
    //   return res.status(200).json(product);
    // } catch (e) {
    //   return res.status(500).json({ message: "Something went wrong" });
    // }
  }

  // Update product
  if (req.method === "PATCH") {
    // get value from the array of objects and map it to a new array name value to id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productIDs = req.body.products.map((x: any) => {
      return {
        id: x.value,
      };
    });

    try {
      const order = await prisma.order.update({
        where: { id },
        data: {
          products: {
            set: [],
            connect: productIDs,
          },
          addon: Number(req.body.addon),
          date: moment(req.body.date).format(),
          notes: req.body.notes,
        },
      });
      return res.status(200).json(order);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const order = await prisma.order.delete({
        where: { id },
      });
      return res.status(200).json(order);
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
