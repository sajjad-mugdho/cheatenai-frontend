import { db } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const { conversationId } = req.query;
  console.log(conversationId, "conversationId");

  const session = await getServerSession(req, res, authOptions);

  try {
    const conversation = await db.conversation.findMany({
      where: {
        id: conversationId,
        userId: session.user.id,
      },
      include: {
        Code: true,
      },
    });

    console.log(conversation, "conversation");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json({ conversation });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Could not fetch conversation" });
  }
}
