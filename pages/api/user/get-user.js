import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const session = await getServerSession(req, res, authOptions);
  const user = await db.User.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      Payment: true,
    },
  });

  return res.json({
    user,
  });
}
