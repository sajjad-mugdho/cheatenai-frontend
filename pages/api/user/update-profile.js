import { db } from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const { firstname, lastname, username, bio, phone } = req.body;

  const session = await getServerSession(req, res, authOptions);

  console.log({ firstname, lastname, username, bio, phone });

  try {
    const userUpdate = await db.User.update({
      where: {
        id: session.user.id,
      },
      data: {
        firstname,
        lastname,
        username,
        bio,
        phone,
      },
    });

    console.log(userUpdate);
    res.status(200).json({ userUpdate });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Could not fetch conversation" });
  }
}
