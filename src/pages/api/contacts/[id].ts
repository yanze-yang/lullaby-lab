import { prisma } from "../../../server/db/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const order = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // narrows the type of id to string
  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid id" });

  if (req.method === "GET") {
    try {
      const contact = await prisma.contact.findUnique({
        where: { id },
      });
      return res.status(200).json(contact);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const contact = await prisma.contact.update({
        where: { id },
        data: req.body,
      });
      return res.status(200).json(contact);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const contact = await prisma.contact.delete({
        where: { id },
      });
      return res.status(200).json(contact);
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

export default order;
