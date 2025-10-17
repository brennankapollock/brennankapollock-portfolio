"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, checkAuth } from "@/lib/appwrite/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  async function checkExistingAuth() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      router.push("/admin");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Login</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-lg"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-black focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-300 text-lg"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>Mobile tip: Bookmark this page for quick access</p>
        </div>
      </div>
    </div>
  );
}
