import { MongoClient, Db } from "mongodb";
import { createMiddleware } from "hono/factory";

export let db: Db;

async function connectToMongo(uri: string): Promise<void> {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.MONGODB_DATABASE);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  } finally {
  }
}

const mongoMiddleware = createMiddleware(async (_c, next) => {
  const MONGODB_URI = process.env.MONGODB_URI || "";
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  if (!db) {
    await connectToMongo(MONGODB_URI);
  }
  return next();
});

export default mongoMiddleware;
