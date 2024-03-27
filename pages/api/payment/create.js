import { createHash } from "crypto";
import axios from "axios";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    try {
      const {
        cardNum,
        expMonth,
        expYear,
        member,
        amount,
        cvv2,
        address,
        email,
        mobileNo,
      } = req.body;

      const paymentUrl = process.env.NETSELLER_PAYMENT_URL;
      const companyNum = process.env.NETSELLER_COMPANYNUM;
      const transType = process.env.NETSELLER_TRANSTYPE;
      const typeCredit = process.env.NETSELLER_TYPECREDIT;
      const currencyCode = process.env.NETSELLER_CURRENCYCODE;
      const notificationURL = process.env.NETSELLER_NOTIFICATION_URL;
      const order = "mewmewmew";

      // Concatenate parameters for signature
      const concatenatedString =
        companyNum +
        transType +
        typeCredit +
        amount +
        currencyCode +
        cardNum +
        "AU7E468HNF";

      // Generate SHA256 hash of concatenated string
      const sha256Hash = createHash("sha256")
        .update(concatenatedString)
        .digest("base64");

      // URL encode the signature
      const signature = encodeURIComponent(sha256Hash);
      console.log(signature + "signature");

      // Construct the full URL with encoded signature
      const fullURL = `${paymentUrl}?CompanyNum=${companyNum}&TransType=${transType}&CardNum=${cardNum}&ExpMonth=${expMonth}&ExpYear=${expYear}&Member=${member}&TypeCredit=${typeCredit}&Amount=${amount}&Currency=${currencyCode}&CVV2=${cvv2}&Email=${email}&PhoneNumber=${mobileNo}&notification_url=${notificationURL}&Order=${order}&Signature=${signature}&Value=1`;

      console.log("fullURL:", fullURL);

      // Make the POST request to the payment gateway
      const response = await axios.post(fullURL);

      const responseData = response.data;

      console.log("Response:", responseData);

      // Make the POST request to the payment gateway

      // Parse the response
      const data = {};
      responseData.split("&").forEach((pair) => {
        const [key, value] = pair.split("=");
        data[key] = value;
      });

      // Save the extracted data into your database (modify as per your database schema)
      console.log("Saving data to the database:", data);

      if (data.ReplyDesc === "SUCCESS") {
        await db.payment.create({
          data: {
            userId: session.user.id,
            transType: data.TransType,
            reply: data.Replay,
            transID: data.TransID,
            date: data.Date,
            order: data.Order,
            address,
            amount: data.Amount,
            payments: data.Payments,
            currency: data.Currency,
            confirmationNum: data.ConfirmationNum,
            comment: data.Comment,
            replyDesc: data.ReplyDesc,
            ccType: data.CCType,
            descriptor: data.Descriptor,
            recurringSeries: data.RecurringSeries,
            last4: data.Last4,
            ccStorageID: data.ccStorageID,
            source: data.Source,
            walletID: data.WalletID,
            signType: data.signType,
            signature: data.signature,
          },
          include: {
            user: true,
          },
        });

        await db.user.update({
          where: { id: session.user.id },
          data: {
            credits: 10000,
          },
        });
      } else {
        res.status(response.status).json({ ERROR: data.ReplyDesc });
      }

      res.status(response.status).json({ data });
    } catch (error) {
      console.error("Error in Payment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
