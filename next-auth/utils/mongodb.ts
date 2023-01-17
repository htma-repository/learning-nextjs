import { MongoClient } from "mongodb";

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.ehfolsq.mongodb.net/?retryWrites=true&w=majority`;

export async function connectMongoDB() {
  const client = await MongoClient.connect(URL);
  return client;
}
