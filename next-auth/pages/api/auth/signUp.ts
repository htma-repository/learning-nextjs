import { NextApiRequest, NextApiResponse } from "next";

import { connectMongoDB } from "../../../utils/mongodb";
import { encryptPass } from "../../../utils/encrypt";

import { IUSer } from "../../../types/types";

interface INextApiRequest extends NextApiRequest {
  body: IUSer;
}

export default async function signUp(
  req: INextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    /* Destructuring the email and password from the request body. */
    const { email, password } = req.body;

    /* This is a validation for the email and password. */
    if (
      !email ||
      !email.includes("@") ||
      password.trim().length < 7 ||
      !password
    ) {
      res.status(422).json({ message: "Invalid email or password!" });
      return;
    }

    let client;

    try {
      /* Connecting to the database. */
      client = await connectMongoDB();
    } catch (error) {
      /* This is a way to close the connection to the database and return a 500 status code with a message. */
      res.status(500).json({ message: "Failed Connect Database" });
    }

    /* A way to access the database. */
    const db = client?.db(process.env.DB_NAME);

    /* Checking if the user already exists in the database. */
    const existingUser = await db
      ?.collection("users")
      .findOne({ email: email });

    /* This is checking if the user already exists in the database. If it does, it will return a 422 status
code with a message. */
    if (existingUser) {
      client?.close();
      res.status(422).json({ message: "User Already Exist" });
      return;
    }

    try {
      /* Encrypting the password and then inserting the email and encrypted password into the database. */
      const encryptedPassword = await encryptPass(password);
      await db?.collection("users").insertOne({
        email,
        password: encryptedPassword,
      });
    } catch (error) {
      /* This is a way to close the connection to the database and return a 500 status code with a
    message. */
      client?.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    /* This is a way to close the connection to the database and return a 201 status code with a message. */
    client?.close();
    res.status(201).json({ message: "Signup Successfully!" });
  }
}
