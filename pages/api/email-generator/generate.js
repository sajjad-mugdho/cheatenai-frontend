import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { authOptions } from "../auth/[...nextauth]";

const openai = new OpenAI();

const prefix = {
  role: "system",
  content: `
    You are an email generator. Your task is to compose a professional and courteous email using the provided information. 
    Please ensure the email is well-structured and maintains a formal tone throughout.
    
    Information to include in the email:
    1. Name: John Doe
    2. Company: ABC
    3. Email: [Recipient's email address]
    
    Begin the email with a suitable greeting and introduce yourself and your company. 
    Clearly state the purpose of the email and any relevant details or requests. 
    End the email with a polite closing remark and your signature.
    
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

    if (!session) {
      return res.json({
        error: "Unauthorized, User is not loged in",
        status: 403,
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [prefix, ...messages],
    });

    const aiResponseContent = response.choices[0].message.content;
    // Save the response to the database using Prisma
    const savedResponse = await db.Email.create({
      data: {
        userId: session.user.id,
        role: "assistant",
        content: aiResponseContent,
        model: "email",
        prompt: messages.map((message) => message.content).join("\n"),
        title: "",
      },
    });
    console.log(savedResponse);

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating Email:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
