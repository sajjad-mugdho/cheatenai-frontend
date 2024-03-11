import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  // Input validation (optional but recommended)
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password securely
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Send a successful response with user data (optional)
    res.status(201).json({ success: "User created", user: newUser });
  } catch (error) {
    console.error(error);

    // Handle specific errors (optional)
    // For example, you could handle database errors differently

    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close Prisma connection (optional, handled automatically in v2+)
  }
}
