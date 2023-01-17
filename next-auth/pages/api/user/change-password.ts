import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { IChangePassword } from "../../../types/types";
import { connectMongoDB } from "../../../utils/mongodb";
import { verifyPassword, encryptPass } from "../../../utils/encrypt";

interface INextApiRequest extends NextApiRequest {
  body: IChangePassword;
}

export default async function changePassword(
  req: INextApiRequest,
  res: NextApiResponse
) {
  /* This is to check if the request method is not PATCH, then return. */
  if (req.method !== "PATCH") {
    return;
  }

  /* Destructuring the request body. */
  const { oldPassword, newPassword } = req.body;

  /* This is to get the session from the request. */
  const session = await getSession({ req: req });

  /* This is to check if the user is authenticated or not. If not, then return 401 status code with
  message. */
  if (!session) {
    res.status(401).json({ message: "User not authenticated!" });
    return;
  }

  /* This is to get the user email from the session. */
  const userEmail = session.user.email;

  /* This is to connect to the MongoDB database. */
  const client = await connectMongoDB();

  /* This is to get the database name from the environment variable. */
  const db = client.db(process.env.DB_NAME);

  /* This is to get the user data from the database. */
  const userCollection = await db
    .collection("users")
    .findOne({ email: userEmail });

  /* This is to check if the user is not found in the database, then return 404 status code with
  message. */
  if (!userCollection) {
    client.close();
    res.status(404).json({ message: "User Not Found!" });
    return;
  }

  /* This is to compare the old password with the current password. */
  const comparePass = await verifyPassword(
    oldPassword,
    userCollection?.password
  );

  /* This is to check if the old password is not match with the current password, then return 403
  status code with message. */
  if (!comparePass) {
    client.close();
    res
      .status(403)
      .json({ message: "Old Password not match with current password!" });
    return;
  }

  try {
    /* This is to encrypt the new password. */
    const encryptedPassword = await encryptPass(newPassword);
    /* This is to update the user password in the database. */
    await db
      .collection("users")
      .updateOne(
        { email: userEmail },
        { $set: { password: encryptedPassword } }
      );
  } catch (error) {
    /* This is to close the connection to the MongoDB database and return the status code 500 with
    message. */
    client.close();
    res.status(500).json({ message: "Change Password Failed!" });
    return;
  }

  /* This is to close the connection to the MongoDB database and return the status code 200 with
 message. */
  client.close();
  res.status(200).json({ message: "Change Password Successfully!" });
}
