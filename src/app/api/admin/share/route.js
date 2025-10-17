import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID;

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, title, text, image, type } = body;

    const { databases } = createAdminClient();

    let itemType = type || "link";
    let itemTitle = title || "";
    let itemUrl = url || "";
    let itemText = text || "";
    let itemImage = image || "";

    if (!url && text) {
      itemType = text.length > 200 ? "text" : "quote";
      itemText = text;
    }

    const autoCategories = [];
    if (url) {
      const urlLower = url.toLowerCase();
      if (urlLower.includes("github.com") || urlLower.includes("npm")) {
        autoCategories.push("code");
      } else if (urlLower.includes("design") || urlLower.includes("figma")) {
        autoCategories.push("design");
      } else if (urlLower.includes("music") || urlLower.includes("spotify")) {
        autoCategories.push("music");
      } else if (urlLower.includes("art") || urlLower.includes("museum")) {
        autoCategories.push("art");
      }
    }

    if (autoCategories.length === 0) {
      autoCategories.push("inspiration");
    }

    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        type: itemType,
        title: itemTitle,
        url: itemUrl,
        imageUrl: itemImage,
        imageFileId: "",
        description: "",
        text: itemText,
        author: "",
        categories: autoCategories,
        subcategory: "",
        date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
        source: url ? new URL(url).hostname : "",
      },
    );

    return NextResponse.json(
      {
        success: true,
        document,
        message: "Item saved successfully!",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error sharing to stash:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save item" },
      { status: 500 },
    );
  }
}
