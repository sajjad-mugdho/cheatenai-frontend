import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Retrieve the generated blog posts from the database
    const articles = await db.Article.findMany({
      where: {
        userId: "cltrsotlf00012819z64607j8",
        model: "article",
      },
    });

    return res.json({ articles });
  } catch (error) {
    console.error("Error fetching Blog Posts:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
