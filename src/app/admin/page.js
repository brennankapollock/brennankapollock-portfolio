"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/appwrite/auth";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    const result = await getCurrentUser();
    if (!result.success) {
      router.push("/admin/login");
    } else {
      setUser(result.user);
      setLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl mb-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
          {user && (
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              Welcome, {user.email}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          Logout
        </button>
      </div>

      {/* Quick Add - Primary Action */}
      <Link
        href="/admin/quick-add"
        className="block mb-6 p-6 md:p-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg"
      >
        <div className="text-4xl md:text-5xl mb-3">⚡</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Quick Add</h2>
        <p className="text-neutral-200 dark:text-neutral-800">
          Fast mobile-optimized content submission
        </p>
      </Link>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
        <Link
          href="/admin/stash/new"
          className="block p-6 md:p-8 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
        >
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">📌</div>
          <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Add Stash Item</h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Save links, images, quotes, or notes
          </p>
        </Link>

        <Link
          href="/admin/blog/new"
          className="block p-6 md:p-8 border-2 border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
        >
          <div className="text-4xl md:text-5xl mb-3 md:mb-4">✍️</div>
          <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">New Blog Post</h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Full editor for blog articles
          </p>
        </Link>
      </div>

      {/* Content Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/stash"
          className="block p-5 md:p-6 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
        >
          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Manage Stash</h3>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            View and edit all stash items
          </p>
        </Link>

        <Link
          href="/admin/blog"
          className="block p-5 md:p-6 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
        >
          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Manage Blog</h3>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            View and edit all blog posts
          </p>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="mt-8 pt-8 border-t border-neutral-300 dark:border-neutral-700">
        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link
            href="/"
            className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            → View Site
          </Link>
          <Link
            href="/blog"
            className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            → View Blog
          </Link>
          <Link
            href="/stash"
            className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            → View Stash
          </Link>
        </div>
      </div>
    </div>
  );
}
