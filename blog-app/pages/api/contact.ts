import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { IContact } from "../../types/types";

interface INextRequest extends NextApiRequest {
  body: IContact;
}

const connectMongoDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.ehfolsq.mongodb.net/?retryWrites=true&w=majority`;

async function handler(req: INextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(connectMongoDb);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db(process.env.DB_NAME);

    try {
      await db.collection("messages").insertOne(newMessage);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Successfully stored message!",
      contact_message: newMessage,
    });
  }
}

export default handler;
