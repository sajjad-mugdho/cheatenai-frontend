import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/lib/db";

const openai = new OpenAI();

const prefix = {
  role: "system",
  content: `
    You are a helpful code assistant that can teach a junior developer how to code. explain the code and also detaild comment the code.
  `,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { messages, conversationId } = req.body;

    const session = await getServerSession(req, res, authOptions);

    console.log(session);

    if (!session) {
      throw new Error("User session not found");
    }

    const user = await db.User.findUnique({
      where: { id: session.user.id },
    });

    if (user.credits < 1) {
      throw new Error("Insufficient credits to generate Email");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [prefix, ...messages],
      //   response_format: { type: "json_object" },
    });

    const aiResponseContent = response.choices[0].message.content;

    console.log(aiResponseContent);
    // Save the response to the database using Prisma

    const savedResponse = await db.Code.create({
      data: {
        userId: session.user.id,
        role: "assistant",
        content: aiResponseContent,
        model: "code",
        prompt: messages.map((message) => message.content).join("\n"),
        title: "",
        codeConversationId: conversationId,
      },
    });

    if (savedResponse) {
      await db.User.update({
        where: {
          id: session.user.id,
        },
        data: {
          credits: {
            decrement: 500,
          },
        },
      });
    }

    console.log(savedResponse, "savedResponse");

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating Code:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
