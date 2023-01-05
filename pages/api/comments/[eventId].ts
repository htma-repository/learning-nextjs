import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { IComments } from "../../../utils/type";
import {
  databaseConnect,
  insertDocument,
  getDocument,
} from "../../../helpers/mongoClient";

interface INextApiRequest extends NextApiRequest {
  body: IComments;
}

const collectionName = "comments";

async function comments(req: INextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId;

  let client: MongoClient;

  try {
    client = await databaseConnect();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid comment input" });
      return;
    }

    const newCommentData: IComments = {
      eventId,
      email,
      name,
      text,
    };

    try {
      await insertDocument(client, newCommentData, collectionName);
      res.status(201).json({
        comments: newCommentData,
        message: "Add comment successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const commentsDocuments = await getDocument(client, collectionName, {
        _id: -1,
      });
      res.status(201).json({
        comments: commentsDocuments,
        message: "Get comment successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Getting comment failed" });
    }
  }

  client.close();
}

export default comments;
