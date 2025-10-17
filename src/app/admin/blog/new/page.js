"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite/auth";

const BLOG_CATEGORIES = [
  ["interface-design", "Philosophy"],
  ["development", "Development"],
  ["process", "Process"],
  ["culture", "Culture"],
  ["editorial-interfaces", "Engineering"],
  ["typography", "Typography"],
  ["layout-systems", "Layout Systems"],
  ["react", "React"],
  ["css", "CSS"],
  ["performance", "Performance"],
  ["design-systems", "Design Systems"],
  ["workflow", "Workflow"],
  ["art", "Art"],
];

export default function NewBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "Brennan K.A. Pollock",
    readingTime: "5 min read",
    categories: [],
    excerpt: "",
    content: "",
    published: false,
    date: new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-0?/g, ".")
      .replace(/^(\d+)\.(\d+)\.(\d+)$/, "$1.$2.$3"),
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
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(e) {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug:
        prev.slug === "" || prev.slug === generateSlug(prev.title)
          ? generateSlug(title)
          : prev.slug,
    }));
  }

  function toggleCategory(category) {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create blog post");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/blog");
      }, 1500);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold">Blog post created!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-lg"
            placeholder="Enter post title..."
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-2">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 font-mono text-sm"
            placeholder="post-url-slug"
          />
        </div>

        {/* Author & Reading Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
            />
          </div>
          <div>
            <label
              htmlFor="readingTime"
              className="block text-sm font-medium mb-2"
            >
              Reading Time *
            </label>
            <input
              id="readingTime"
              name="readingTime"
              type="text"
              value={formData.readingTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder="5 min read"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="block text-sm font-medium mb-2">Categories *</div>
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleCategory(value)}
                className={`px-4 py-2 rounded border text-sm ${
                  formData.categories.includes(value)
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black border-neutral-900 dark:border-neutral-100"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
            placeholder="Brief description of the post..."
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content * (Markdown supported)
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={20}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 font-mono text-sm"
            placeholder="Write your post content here..."
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center">
          <input
            id="published"
            name="published"
            type="checkbox"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 border-neutral-300 dark:border-neutral-700 rounded"
          />
          <label htmlFor="published" className="ml-3 text-sm font-medium">
            Publish immediately (uncheck to save as draft)
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting || formData.categories.length === 0}
            className="w-full py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {submitting
              ? "Creating..."
              : formData.published
                ? "Publish Post"
                : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
