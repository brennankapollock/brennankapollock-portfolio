/**
 * Migration script to import existing blog posts and stash items into Appwrite
 *
 * Usage:
 * 1. Make sure .env.local is configured with Appwrite credentials
 * 2. Run: node scripts/migrate-to-appwrite.js
 */

import { Client, Databases, ID } from "node-appwrite";
import { blogPosts } from "../src/data/blogPosts.js";
import { stashItems } from "../src/data/stashItems.js";

const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const BLOG_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID;
const STASH_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID;

async function migrateBlogPosts() {
  console.log("\n📝 Migrating blog posts...");

  for (const post of blogPosts) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        BLOG_COLLECTION_ID,
        ID.unique(),
        {
          title: post.title,
          slug: post.slug,
          date: post.date,
          author: post.author,
          readingTime: post.readingTime,
          categories: post.categories,
          excerpt: post.excerpt,
          content: post.content,
          published: true,
        },
      );
      console.log(`✓ Created: ${post.title}`);
    } catch (error) {
      console.error(`✗ Failed to create ${post.title}:`, error.message);
    }
  }

  console.log(
    `\n✓ Blog posts migration complete: ${blogPosts.length} posts processed`,
  );
}

async function migrateStashItems() {
  console.log("\n📌 Migrating stash items...");

  for (const item of stashItems) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        STASH_COLLECTION_ID,
        ID.unique(),
        {
          type: item.type,
          title: item.title || "",
          url: item.url || "",
          imageUrl: item.imageUrl || "",
          imageFileId: "",
          description: item.description || "",
          text: item.text || "",
          author: item.author || "",
          categories: item.categories || [],
          subcategory: item.subcategory || "",
          date: item.date,
          source: item.source || "",
        },
      );
      console.log(
        `✓ Created: ${item.title || `${item.text?.substring(0, 30)}...` || item.id}`,
      );
    } catch (error) {
      console.error(`✗ Failed to create ${item.id}:`, error.message);
    }
  }

  console.log(
    `\n✓ Stash items migration complete: ${stashItems.length} items processed`,
  );
}

async function main() {
  console.log("🚀 Starting Appwrite migration...\n");

  console.log("Configuration:");
  console.log(`  Endpoint: ${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`);
  console.log(`  Project: ${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);
  console.log(`  Database: ${DATABASE_ID}`);
  console.log(`  Blog Collection: ${BLOG_COLLECTION_ID}`);
  console.log(`  Stash Collection: ${STASH_COLLECTION_ID}\n`);

  if (!DATABASE_ID || !BLOG_COLLECTION_ID || !STASH_COLLECTION_ID) {
    console.error("❌ Missing required environment variables!");
    console.error("Please check your .env.local file");
    process.exit(1);
  }

  try {
    await migrateBlogPosts();
    await migrateStashItems();

    console.log(
      "\n✨ Migration complete! Check your Appwrite console to verify.\n",
    );
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    process.exit(1);
  }
}

main();
