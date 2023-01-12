import { MongoClient, Document, Sort } from "mongodb";

export const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.ehfolsq.mongodb.net/?retryWrites=true&w=majority`;

export async function databaseConnect() {
  const client = await MongoClient.connect(URL);
  return client;
}

export async function insertDocument(
  client: MongoClient,
  document: Document,
  collectionName: string
) {
  const db = client.db(process.env.DB_NAME);
  return await db.collection(collectionName).insertOne(document);
}

export async function getDocument<
  T extends MongoClient,
  U extends string,
  V extends Sort
>(client: T, collectionName: U, sort: V) {
  const db = client.db("Events");
  return await db.collection(collectionName).find().sort(sort).toArray();
}
