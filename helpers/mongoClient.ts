import { MongoClient, Document, Sort } from "mongodb";

export const URL =
  "mongodb+srv://admin:hSqQv48tg1m9X8pM@events-db.ehfolsq.mongodb.net/?retryWrites=true&w=majority";

export async function databaseConnect() {
  const client = await MongoClient.connect(URL);
  return client;
}

export async function insertDocument(
  client: MongoClient,
  document: Document,
  collectionName: string
) {
  const db = client.db("Events");
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
