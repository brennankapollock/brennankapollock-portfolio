import { Client, Account, Databases, Storage } from "appwrite";

// Client-side Appwrite configuration
export const appwriteConfig = {
  endpoint:
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  blogPostsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID || "",
  stashItemsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID || "",
  draftsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_DRAFTS_COLLECTION_ID || "",
  storageBucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || "",
};

// Initialize client
export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
