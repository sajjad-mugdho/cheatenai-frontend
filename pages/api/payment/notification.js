// pages/api/notification.js

import { db } from "@/lib/db";

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    try {
      // Parse notification data from the request body
      const {
        transType,
        reply,
        transID,
        date,
        order,
        amount,
        payments,
        currency,
        confirmationNum,
        comment,
        replyDesc,
        ccType,
        descriptor,
        recurringSeries,
        last4,
        ccStorageID,
        source,
        walletID,
        signType,
        signature,
      } = req.body;

      // Validate the notification signature
      console.log(
        "payment",
        transType,
        reply,
        transID,
        date,
        order,
        amount,
        payments,
        currency,
        confirmationNum,
        comment,
        replyDesc,
        ccType,
        descriptor,
        recurringSeries,
        last4,
        ccStorageID,
        source,
        walletID,
        signType,
        signature
      );

      await db.Notification.create({
        data: {
          transType,
          userId: session.user.id,
          reply,
          transID,
          date,
          order,
          amount,
          payments,
          currency,
          confirmationNum,
          comment,
          replyDesc,
          ccType,
          descriptor,
          recurringSeries,
          last4,
          ccStorageID,
          source,
          walletID,
          signType,
          signature,
        },
      });
      // Process notification data
      // Update transaction status in your database
      // Perform additional actions based on transaction status

      // Respond to the payment gateway with a success message
      res.status(200).send("Notification received and processed successfully.");
    } catch (error) {
      console.error("Error processing notification:", error);
      // Respond with an error status code
      res.status(500).send("Internal Server Error");
    }
  } else {
    // Respond with a method not allowed status code
    res.status(405).end();
  }
}
