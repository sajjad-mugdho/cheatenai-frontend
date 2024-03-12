import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { messages } = req.body;
    console.log(messages);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating text:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
