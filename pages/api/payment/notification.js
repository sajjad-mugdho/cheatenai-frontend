// pages/api/notification.js

import { createHash } from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
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
      console.log("payment", req.body);
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
