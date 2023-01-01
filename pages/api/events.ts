import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import { IEventItems } from "./../../utils/interface";

function getFilePath() {
  return path.join(process.cwd(), "events-db.json");
}

function getJsonData(filePath: string) {
  const eventsData = fs.readFileSync(filePath);
  const JSONdata: IEventItems[] = JSON.parse(eventsData.toString());

  return JSONdata;
}

function getEvents(req: NextApiRequest, res: NextApiResponse<IEventItems[]>) {
  if (req.method === "GET") {
    const filePath = getFilePath();
    const data = getJsonData(filePath);
    res.status(200).json(data);
  }

  if (req.method === "POST") {
    const newEvent = { ...req.body, id: Date.now().toString() };

    const filePath = getFilePath();
    const data = getJsonData(filePath);
    data.push(newEvent);
    fs.writeFileSync(filePath, data.toString());

    res.status(200).json(data);
  }
}

export default getEvents;
