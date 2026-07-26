import { MongoClient } from "mongodb";
import app from "next/app";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri(): string {
  // Try to use complete MONGODB_URI first (for local dev)
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Build URI from individual components (for GoDaddy)
  const host = process.env.DB_HOST;
  // const port = process.env.DB_PORT || "27017";
  const port = process.env.PORT || 3000;
  // app.listen(port);
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  if (!host || !user || !password || !dbName) {
    throw new Error(
      "MongoDB connection details are incomplete. Please provide either MONGODB_URI or all of: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME"
    );
  }

  // Build the URI string
  const encodedPassword = encodeURIComponent(password);
  return `mongodb+srv://${user}:${encodedPassword}@${host}:${port}/${dbName}`;
}

// Reuse a single MongoDB client across hot reloads in development.
export function getMongoClient(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(getMongoUri());
    global._mongoClientPromise = client.connect();
  }

  return global._mongoClientPromise;
}

export async function getDatabase() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB_NAME || "rudhco";

  return client.db(dbName);
}
