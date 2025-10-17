import { databases } from "./config";
import { appwriteConfig } from "./config";
import { Query } from "appwrite";

export async function getBlogPosts({ published = true, limit = 100 } = {}) {
  try {
    const queries = [];

    if (published) {
      queries.push(Query.equal("published", true));
    }

    queries.push(Query.limit(limit));
    queries.push(Query.orderDesc("date"));

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.blogPostsCollectionId,
      queries,
    );

    return { success: true, posts: response.documents };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { success: false, error: error.message, posts: [] };
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.blogPostsCollectionId,
      [Query.equal("slug", slug), Query.limit(1)],
    );

    if (response.documents.length === 0) {
      return { success: false, error: "Post not found", post: null };
    }

    return { success: true, post: response.documents[0] };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: error.message, post: null };
  }
}

export async function getStashItems({
  categories = [],
  types = [],
  limit = 100,
} = {}) {
  try {
    const queries = [];

    if (categories.length > 0) {
      queries.push(Query.equal("categories", categories));
    }

    if (types.length > 0) {
      queries.push(Query.equal("type", types));
    }

    queries.push(Query.limit(limit));
    queries.push(Query.orderDesc("date"));

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.stashItemsCollectionId,
      queries,
    );

    return { success: true, items: response.documents };
  } catch (error) {
    console.error("Error fetching stash items:", error);
    return { success: false, error: error.message, items: [] };
  }
}

export async function getStashItemById(id) {
  try {
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.stashItemsCollectionId,
      id,
    );

    return { success: true, item: document };
  } catch (error) {
    console.error("Error fetching stash item:", error);
    return { success: false, error: error.message, item: null };
  }
}
