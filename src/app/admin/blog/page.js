"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite/auth";
import Link from "next/link";

export default function ManageBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  async function checkAuthAndFetch() {
    const result = await getCurrentUser();
    if (!result.success) {
      router.push("/admin/login");
      return;
    }

    await fetchPosts();
  }

  async function fetchPosts() {
    try {
      const response = await fetch("/api/admin/blog");
      const data = await response.json();

      if (data.success) {
        setPosts(data.documents || []);
      } else {
        setError(data.error || "Failed to load posts");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Link
            href="/admin"
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-4 block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Manage Blog</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {posts.length} posts total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200"
        >
          Add New
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {posts.length === 0
        ? <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No blog posts yet
            </p>
            <Link
              href="/admin/blog/new"
              className="text-neutral-900 dark:text-neutral-100 hover:underline"
            >
              Write your first post →
            </Link>
          </div>
        : <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-6 border border-neutral-300 dark:border-neutral-700 rounded hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.published
                        ? <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">
                            Published
                          </span>
                        : <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded">
                            Draft
                          </span>}
                      {post.categories?.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-xs rounded"
                          >
                            {cat}
                          </span>
                        ))}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-neutral-500">
                      {post.date} · {post.readingTime} · /{post.slug}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
}
