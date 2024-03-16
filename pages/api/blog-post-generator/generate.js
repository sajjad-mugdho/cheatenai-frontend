import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/lib/db";

const openai = new OpenAI();

const prefix = {
  role: "system",
  content: `
    You are tasked with creating a top-notch blog post. Your goal is to produce a well-researched and engaging article that provides valuable insights to the reader. 

    Topic: [Specify the topic of the blog post]

    Begin the blog post with an attention-grabbing introduction that introduces the topic and captures the reader's interest. Provide context and background information to set the stage for the discussion.

    Conduct thorough research on the topic, using reputable sources and studies to support your points. Incorporate relevant data, statistics, and examples to strengthen your arguments and add credibility to the content.

    Structure the blog post with clear headings and subheadings to organize the information logically and make it easy to follow. Each section should flow seamlessly into the next, creating a cohesive narrative.

    Aim for a conversational yet authoritative tone that resonates with the target audience. Use language that is clear, concise, and free of jargon to ensure accessibility and readability.

    Include engaging visuals such as images, charts, or infographics to enhance the readability and visual appeal of the blog post. Visuals should complement the text and help convey key messages more effectively.

    Conclude the blog post with a compelling summary that reinforces the main points and provides actionable takeaways for the reader. Encourage further discussion or exploration of the topic.

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

    console.log(session);

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
    const savedResponse = await db.OpenAIResponse.create({
      data: {
        userId: "cltrsotlf00012819z64607j8",
        role: "assistant",
        content: aiResponseContent,
        model: "blog-post",
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
