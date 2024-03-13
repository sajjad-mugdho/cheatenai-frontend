import OpenAI from "openai";

const openai = new OpenAI();

const prifix = {
  role: "system",
  content:
    "You are a email generator. you must write a email with casully and professional. you can use the following information to write the email. 1. Name: John Doe 2. Company: ABC  4. Email:",
};
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { messages } = req.body;
    console.log(messages);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [prifix, ...messages],
    });

    return res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating Email:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
