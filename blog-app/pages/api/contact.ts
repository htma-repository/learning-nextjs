import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { IContact } from "../../types/types";

interface INextRequest extends NextApiRequest {
  body: IContact;
}

/* Connecting to the MongoDB database. */
const connectMongoDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.ehfolsq.mongodb.net/?retryWrites=true&w=majority`;

async function handler(req: INextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    /* Destructuring the req.body object. */
    const { email, name, message } = req.body;

    /* Checking if the email, name, and message are valid. */
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
      /* Connecting to the MongoDB database. */
      client = await MongoClient.connect(connectMongoDb);
    } catch (error) {
      /* Returning a status code of 500 and a message of "Could not connect to database." */
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    /* Creating a database called from `process.env.DB_NAME` */
    const db = client.db(process.env.DB_NAME);

    try {
      /* Inserting the newMessage object into the messages collection. */
      await db.collection("messages").insertOne(newMessage);
    } catch (error) {
      client.close();
      /* Returning a status code of 500 and a message of "Storing message failed!" */
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    /* Closing the connection to the database and returning a status code of 201 and a message of
"Successfully stored message!" and the newMessage object. */
    client.close();
    res.status(201).json({
      message: "Successfully stored message!",
      contact_message: newMessage,
    });
  }
}

export default handler;
