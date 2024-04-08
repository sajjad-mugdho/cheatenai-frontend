import { db } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    const plans = await db.Plans1.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    res.json({ plans });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Could not fetch conversation" });
  }
}
