import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { authOptions } from "../auth/[...nextauth]";

const openai = new OpenAI();

const prefix = {
  role: "system",
  content: `
    You are an article generator. Your task is to compose a well-researched and engaging article on the given topic. 
    Please ensure that the article is informative, coherent, and written in a clear and concise manner.
    
    Topic: [Specify the topic of the article]
    
    Begin the article with an attention-grabbing introduction that outlines the main points to be covered. 
    Provide relevant background information and context to help readers understand the topic.
    
    Use subheadings to organize the content and make it easy to navigate. 
    Include supporting evidence, statistics, and examples to back up your points and make the article more credible.
    
    Aim for a balanced and objective tone throughout the article. 
    Acknowledge different perspectives if applicable and present them in a fair and unbiased manner.
    
    Conclude the article with a summary of the key points discussed and any concluding remarks or recommendations.
    
    Please respond with (\n) to maintain line breaks and paragraphs as intended.
  `,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { messages } = req.body;

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
      max_tokens: 500,
    });

    const aiResponseContent = response.choices[0].message.content;
    // Save the response to the database using Prisma
    const savedResponse = await db.Article.create({
      data: {
        userId: session.user.id,
        role: "assistant",
        content: aiResponseContent,
        model: "article",
        prompt: messages.map((message) => message.content).join("\n"),
        title: "",
      },
    });

    console.log(savedResponse);

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating text:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
