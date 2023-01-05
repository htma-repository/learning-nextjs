import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
// import fs from "fs";

import { IEventItems } from "../../../utils/type";
// import { getFilePath, getJsonData } from "../../../utils/db-json";
import {
  databaseConnect,
  insertDocument,
  getDocument,
} from "../../../helpers/mongoClient";

interface INextApiRequest extends NextApiRequest {
  body: IEventItems;
}

const collectionName = "events";

async function getEvents(req: INextApiRequest, res: NextApiResponse) {
  let client: MongoClient;

  try {
    client = await databaseConnect();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed" });
    return;
  }

  if (req.method === "GET") {
    try {
      const eventsData = await getDocument(client, collectionName, { _id: -1 });

      res
        .status(200)
        .json({ events: eventsData, message: "Get events successfully" });
    } catch (error) {
      res.status(500).json({ message: "Getting events failed" });
    }
    // const filePath = getFilePath();
    // const data = getJsonData(filePath);
    // res.status(200).json(data.events);
  }

  if (req.method === "POST") {
    const { date, image, location, title, description, isFeatured } = req.body;

    if (
      !date ||
      date.trim() === "" ||
      !image ||
      image.trim() === "" ||
      !location ||
      location.trim() === "" ||
      !title ||
      title.trim() === "" ||
      !description ||
      description.trim() === "" ||
      !isFeatured ||
      !isFeatured.valueOf()
    ) {
      res.status(422).json({ message: "Invalid events input" });
      return;
    }

    const newEventData: IEventItems = {
      title,
      description,
      date,
      location,
      image,
      isFeatured,
    };

    try {
      await insertDocument(client, newEventData, collectionName);
      res.status(201).json({
        events: newEventData,
        message: "Add events successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting event failed" });
    }
    // const newEvent: IEventItems = { ...req.body, id: Date.now().toString() };
    // const filePath = getFilePath();
    // const data = getJsonData(filePath);
    // data.events.push(newEvent);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(200).json(data.events);
  }

  client.close();
}

export default getEvents;
