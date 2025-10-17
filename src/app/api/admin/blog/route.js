import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { databases } = createAdminClient();

    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        title: body.title,
        slug: body.slug,
        date:
          body.date ||
          new Date().toISOString().split("T")[0].replace(/-/g, "."),
        author: body.author || "Brennan K.A. Pollock",
        readingTime: body.readingTime || "5 min read",
        categories: body.categories || [],
        excerpt: body.excerpt,
        content: body.content,
        published: body.published || false,
      },
    );

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create blog post" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const { databases } = createAdminClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");

    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      // Add queries here if needed
    ]);

    return NextResponse.json({ success: true, documents: response.documents });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}
