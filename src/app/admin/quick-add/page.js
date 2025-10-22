"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite/auth";

export default function QuickAdd() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("stash"); // 'stash' or 'blog'

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    url: "",
    type: "link",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const result = await getCurrentUser();
    if (!result.success) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "stash") {
        // Create stash item with minimal fields
        const stashData = {
          type: formData.type,
          title: formData.title || formData.url,
          url: formData.url,
          text: formData.content,
          description: formData.content,
          categories: ["inspiration"], // Default category
          date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
        };

        const response = await fetch("/api/admin/stash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stashData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create stash item");
        }
      } else {
        // Create blog draft with minimal fields
        const blogData = {
          title: formData.title,
          slug: generateSlug(formData.title),
          author: "Brennan K.A. Pollock",
          readingTime: "5 min read",
          categories: ["process"], // Default category
          excerpt: formData.content.substring(0, 200),
          content: formData.content,
          published: false, // Save as draft
          date: new Date()
            .toISOString()
            .split("T")[0]
            .replace(/-0?/g, ".")
            .replace(/^(\d+)\.(\d+)\.(\d+)$/, "$1.$2.$3"),
        };

        const response = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create blog draft");
        }
      }

      setSuccess(true);
      setTimeout(() => {
        setFormData({ title: "", content: "", url: "", type: "link" });
        setSuccess(false);
        setSubmitting(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Saved!</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {mode === "stash" ? "Stash item" : "Draft"} created successfully
          </p>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({ title: "", content: "", url: "", type: "link" });
            }}
            className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200"
          >
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pb-24 max-w-2xl mx-auto">
      {/* Header with mode toggle */}
      <div className="mb-6 sticky top-0 bg-white dark:bg-black py-4 z-10">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-4"
        >
          ← Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-4">Quick Add</h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("stash")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              mode === "stash"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            }`}
          >
            📌 Stash
          </button>
          <button
            type="button"
            onClick={() => setMode("blog")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              mode === "blog"
                ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            }`}
          >
            ✍️ Draft
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Type selector for stash mode */}
        {mode === "stash" && (
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {["link", "quote", "text"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                  className={`py-3 px-4 rounded-lg font-medium capitalize ${
                    formData.type === type
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black"
                      : "bg-neutral-100 dark:bg-neutral-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* URL field for links */}
        {mode === "stash" && formData.type === "link" && (
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-2">
              URL *
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-base"
              placeholder="https://..."
              autoComplete="off"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            {mode === "blog" ? "Title *" : "Title (optional)"}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required={mode === "blog"}
            className="w-full px-4 py-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-base"
            placeholder={mode === "blog" ? "Enter title..." : "Optional title..."}
            autoComplete="off"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            {mode === "blog" ? "Content *" : formData.type === "quote" ? "Quote *" : "Note"}
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required={mode === "blog" || formData.type !== "link"}
            rows={mode === "blog" ? 12 : 6}
            className="w-full px-4 py-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-base"
            placeholder={
              mode === "blog"
                ? "Start writing..."
                : formData.type === "quote"
                  ? "Enter quote..."
                  : "Optional note..."
            }
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 sticky bottom-0 bg-white dark:bg-black pb-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg font-bold text-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {submitting ? "Saving..." : mode === "blog" ? "Save Draft" : "Add to Stash"}
          </button>

          {mode === "blog" && (
            <button
              type="button"
              onClick={() => router.push("/admin/blog/new")}
              className="w-full mt-2 py-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg font-medium hover:border-neutral-900 dark:hover:border-neutral-300"
            >
              Open Full Editor
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
