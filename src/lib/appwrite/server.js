import { Client, Databases, Storage, Query } from "node-appwrite";

// Server-side Appwrite client (with API key)
export function createAdminClient() {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
        "https://cloud.appwrite.io/v1",
    )
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

  return {
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export { Query };
