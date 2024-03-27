import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const session = await getServerSession(req, res, authOptions);
  try {
    const conversation = await db.Conversation.create({
      data: {
        userId: session.user.id,
      },
      include: {
        Article: true,
        Code: true,
        Email: true,
        Blog: true,
      },
    });
    res.status(201).json({ conversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Could not create conversation" });
  }
}
