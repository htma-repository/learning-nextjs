import { NextApiRequest, NextApiResponse } from "next";

import { databaseConnect, insertDocument } from "../../../helpers/mongoClient";

const collectionName = "newsletter";

async function newsletter(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const emailData = req.body.email;

    if (!emailData || !emailData.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    const newEmailData = {
      email: emailData,
    };

    let clients;

    try {
      clients = await databaseConnect();
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed" });
      return;
    }

    try {
      await insertDocument(clients, newEmailData, collectionName);
      clients.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }
    res.status(201).json({ email: emailData, message: "Sign Up Successfully" });
  }
}

export default newsletter;
