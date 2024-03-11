import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
    });

    console.log("res", response.choices[0].message);
    return res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating text:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
