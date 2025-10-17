"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/appwrite/auth";

const STASH_TYPES = ["link", "image", "text", "quote", "video"];
const STASH_CATEGORIES = [
  "music",
  "books",
  "films",
  "art",
  "quotes",
  "design",
  "code",
  "inspiration",
  "culture",
];

export default function NewStashItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: "link",
    title: "",
    url: "",
    imageUrl: "",
    description: "",
    text: "",
    author: "",
    categories: [],
    subcategory: "",
    source: "",
    date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
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
    const { name, value, type: inputType } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      const response = await fetch("/api/admin/stash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create stash item");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/stash");
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
          <h2 className="text-2xl font-bold">Stash item created!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold">Add Stash Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Type *</label>
          <div className="flex flex-wrap gap-2">
            {STASH_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type }))}
                className={`px-4 py-2 rounded border ${
                  formData.type === type
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black border-neutral-900 dark:border-neutral-100"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title {formData.type !== "text" && "*"}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required={formData.type !== "text"}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
            placeholder="Enter title..."
          />
        </div>

        {/* URL (for link/image/video) */}
        {["link", "image", "video"].includes(formData.type) && (
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
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder="https://..."
            />
          </div>
        )}

        {/* Image URL */}
        {["link", "image"].includes(formData.type) && (
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium mb-2"
            >
              Image URL (optional)
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder="https://..."
            />
          </div>
        )}

        {/* Description */}
        {["link", "image", "video"].includes(formData.type) && (
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder="Brief description..."
            />
          </div>
        )}

        {/* Text (for text/quote types) */}
        {["text", "quote"].includes(formData.type) && (
          <div>
            <label htmlFor="text" className="block text-sm font-medium mb-2">
              {formData.type === "quote" ? "Quote" : "Text"} *
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder={
                formData.type === "quote"
                  ? "Enter quote..."
                  : "Enter text content..."
              }
            />
          </div>
        )}

        {/* Author (for quotes) */}
        {formData.type === "quote" && (
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
              placeholder="Author name..."
            />
          </div>
        )}

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories *</label>
          <div className="flex flex-wrap gap-2">
            {STASH_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded border text-sm ${
                  formData.categories.includes(category)
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black border-neutral-900 dark:border-neutral-100"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory */}
        <div>
          <label
            htmlFor="subcategory"
            className="block text-sm font-medium mb-2"
          >
            Subcategory (optional)
          </label>
          <input
            id="subcategory"
            name="subcategory"
            type="text"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
            placeholder="e.g., typography, albums, etc."
          />
        </div>

        {/* Source */}
        <div>
          <label htmlFor="source" className="block text-sm font-medium mb-2">
            Source (optional)
          </label>
          <input
            id="source"
            name="source"
            type="text"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300"
            placeholder="e.g., website name"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting || formData.categories.length === 0}
            className="w-full py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {submitting ? "Creating..." : "Create Stash Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
