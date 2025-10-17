import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { databases } = createAdminClient();

    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        type: body.type,
        title: body.title || "",
        url: body.url || "",
        imageUrl: body.imageUrl || "",
        imageFileId: body.imageFileId || "",
        description: body.description || "",
        text: body.text || "",
        author: body.author || "",
        categories: body.categories || [],
        subcategory: body.subcategory || "",
        date:
          body.date ||
          new Date().toISOString().split("T")[0].replace(/-/g, "."),
        source: body.source || "",
      },
    );

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (error) {
    console.error("Error creating stash item:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create stash item" },
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
    console.error("Error fetching stash items:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch stash items" },
      { status: 500 },
    );
  }
}
