import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.json({
      error: "Unauthorized, User is not loged in",
      status: 403,
    });
  }
  try {
    // Retrieve the generated blog posts from the database
    const codes = await db.Code.findMany({
      where: {
        userId: session.user.id,
        model: "code",
      },
    });

    return res.json({ codes });
  } catch (error) {
    console.error("Error fetching Blog Posts:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
