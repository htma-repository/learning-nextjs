import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

// import { getFilePath, getJsonData } from "../../../utils/db-json";
import { databaseConnect, getDocument } from "../../../helpers/mongoClient";

const collectionName = "events";

async function eventsByIdHandler(req: NextApiRequest, res: NextApiResponse) {
  let client: MongoClient;

  try {
    client = await databaseConnect();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed" });
    return;
  }

  if (req.method === "GET") {
    const eventsId = req.query.eventsId;

    try {
      const eventsData = await getDocument(client, collectionName, {
        _id: -1,
      });

      const selectedEvent = eventsData.find(
        (event) => event._id.toString() === eventsId
      );

      res
        .status(200)
        .json({ event: selectedEvent, message: "Get event successfully" });
    } catch (error) {
      res.status(500).json({ message: "Getting event failed" });
    }
    // const filePath = getFilePath();
    // const jsonData = getJsonData(filePath);
    // const selectedEvent = jsonData.events.find(
    //   (event) => event._id === eventsId
    // );
    // res.status(200).json(selectedEvent);
  }
}

export default eventsByIdHandler;
