import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }
  const session = await getServerSession(req, res, authOptions);
  try {
    const conversation = await db.EmailConversation.create({
      data: {
        userId: session.user.id,
      },
    });

    res.status(201).json({ conversation });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Could not create conversation" });
  }
}
