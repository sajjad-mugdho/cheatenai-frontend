import { db } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  try {
    const isExist = await db.Plans1.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    console.log(isExist, "isExist");

    if (isExist !== null) {
      console.log("IFFFF");
      return res.status(200).json({ message: "User already have a plan" });
    } else {
      console.log("ELSEEEE");
      const userUpdate = await db.Plans1.create({
        data: {
          isFree: true,
          userId: session.user.id,
        },
      });
      console.log(userUpdate);
      res.status(200).json({ userUpdate });
    }
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Could not fetch conversation" });
  }
}
