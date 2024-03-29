import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/lib/db";

const openai = new OpenAI();

const prefix = {
  role: "system",
  content: `
    You're tasked with generating a code snippet. Please provide the necessary details and specifications for the code you need.

    Description: [Describe the functionality or purpose of the code snippet]

    Requirements: [Specify any requirements or constraints for the code]

    Output format: [Specify the programming language or format for the code snippet]

    Additional instructions: [Provide any additional instructions or preferences]
    
    Please respond with (\n) to maintain line breaks and paragraphs as intended.
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
      max_tokens: 500,
    });

    const aiResponseContent = response.choices[0].message.content;
    // Save the response to the database using Prisma
    const savedResponse = await db.Blog.create({
      data: {
        userId: session.user.id,
        role: "assistant",
        content: aiResponseContent,
        model: "blog-post",
        prompt: messages.map((message) => message.content).join("\n"),
        title: "",
        blogConversationId: conversationId,
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

    console.log(savedResponse);

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating Email:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
