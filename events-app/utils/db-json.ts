import fs from "fs";
import path from "path";

import { IEvents } from "./type";

export function getFilePath() {
  return path.join(process.cwd(), "events-db.json");
}

export function getJsonData(filePath: string) {
  const eventsData = fs.readFileSync(filePath);
  const JSONdata: IEvents = JSON.parse(eventsData.toString());
  return JSONdata;
}
