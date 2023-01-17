import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectMongoDB } from "../../../utils/mongodb";
import { verifyPassword } from "../../../utils/encrypt";

export default NextAuth({
  providers: [
    /* A function that is used to authenticate the user. */
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        /* Connecting to the MongoDB database. */
        const client = await connectMongoDB();

        /* Getting the database name from the environment variable. */
        const db = client.db(process.env.DB_NAME);

        /* Finding the user in the database. */
        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email });

        /* If the user is not found, it will throw an error. */
        if (!user) {
          client.close();
          throw new Error("User Not Found");
        }

        // compare password
        const isPasswordValid = await verifyPassword(
          credentials?.password as string,
          user.password as string
        );

        /* Checking if the password is valid or not. */
        if (!isPasswordValid || user.email !== credentials?.email) {
          client.close();
          throw new Error("Password Invalid");
        }

        /* Closing the connection to the database and returning the result. */
        client.close();
        return { email: user.email };
      },
    }),
  ],
  /* Telling NextAuth to use JWT for session management. */
  session: { strategy: "jwt" },
});
