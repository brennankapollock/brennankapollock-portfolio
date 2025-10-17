"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite/auth";
import Link from "next/link";

export default function ManageStash() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
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

    await fetchItems();
  }

  async function fetchItems() {
    try {
      const response = await fetch("/api/admin/stash");
      const data = await response.json();

      if (data.success) {
        setItems(data.documents || []);
      } else {
        setError(data.error || "Failed to load items");
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
          <h1 className="text-3xl font-bold">Manage Stash</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            {items.length} items total
          </p>
        </div>
        <Link
          href="/admin/stash/new"
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

      {items.length === 0
        ? <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No stash items yet
            </p>
            <Link
              href="/admin/stash/new"
              className="text-neutral-900 dark:text-neutral-100 hover:underline"
            >
              Create your first item →
            </Link>
          </div>
        : <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.$id}
                className="p-6 border border-neutral-300 dark:border-neutral-700 rounded hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-xs rounded">
                        {item.type}
                      </span>
                      {item.categories &&
                        item.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900 text-xs rounded"
                          >
                            {cat}
                          </span>
                        ))}
                    </div>
                    <h3 className="text-lg font-bold mb-1">
                      {item.title ||
                        item.text?.substring(0, 60) + "..." ||
                        "Untitled"}
                    </h3>
                    {item.description && (
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                      >
                        {item.url.substring(0, 60)}...
                      </a>
                    )}
                    <div className="mt-2 text-xs text-neutral-500">
                      {item.date} {item.source && `· ${item.source}`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900">
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
