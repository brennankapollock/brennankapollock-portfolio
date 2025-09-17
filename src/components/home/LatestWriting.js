"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "The Architecture of Modern Web Applications",
    excerpt:
      "Exploring patterns and practices that define scalable, maintainable web architectures in 2024.",
    date: "2024-01-15",
    readingTime: "8 min read",
    author: "Brennan Pollock",
    category: "Engineering",
    featured: true,
  },
  {
    id: 2,
    title: "Designing with Constraints: A Creative Methodology",
    excerpt:
      "How limitations can spark innovation and lead to more focused, impactful design solutions.",
    date: "2024-01-10",
    readingTime: "6 min read",
    author: "Brennan Pollock",
    category: "Design",
  },
  {
    id: 3,
    title: "Building Real-Time Collaborative Features",
    excerpt:
      "Technical deep-dive into WebSockets, CRDTs, and the infrastructure behind collaborative apps.",
    date: "2024-01-05",
    readingTime: "12 min read",
    author: "Brennan Pollock",
    category: "Tutorial",
  },
];

export default function LatestWriting() {
  const writingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = writingRef.current?.querySelectorAll(".post-card");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section ref={writingRef} className="py-32 bg-background-subtle">
      <div className="container">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-[var(--letter-spacing-tight)]">
              Latest Writing
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground-muted hover:text-accent-primary transition-colors duration-[var(--transition-fast)] uppercase tracking-[var(--letter-spacing-wider)]"
            >
              View All Posts →
            </Link>
          </div>
          <p className="text-xl text-foreground-muted max-w-2xl">
            Thoughts on design, development, and the creative process
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`post-card opacity-0 translate-y-8 transition-all duration-700 ${
                post.featured ? "lg:col-span-2" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <div
                  className={`bg-background p-8 h-full transition-all duration-[var(--transition-base)] hover:shadow-lg ${
                    post.featured ? "lg:p-12" : ""
                  }`}
                >
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-6 text-sm">
                    <span className="text-accent-primary font-medium uppercase tracking-[var(--letter-spacing-wider)]">
                      {post.category}
                    </span>
                    <span className="w-4 h-[1px] bg-border" />
                    <time className="text-foreground-subtle">
                      {formatDate(post.date)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold mb-4 group-hover:text-accent-primary transition-colors duration-[var(--transition-fast)] ${
                      post.featured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className={`text-foreground-muted mb-6 ${
                      post.featured ? "text-lg" : ""
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* GUIDE BY author credit */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-foreground-subtle uppercase tracking-[var(--letter-spacing-wider)]">
                        GUIDE BY
                      </span>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>

                    {/* Reading time */}
                    <span className="text-sm text-foreground-subtle">
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Featured indicator */}
                  {post.featured && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <span className="inline-flex items-center gap-2 text-accent-warm text-sm font-medium uppercase tracking-[var(--letter-spacing-wider)]">
                        <span className="w-2 h-2 bg-accent-warm rounded-full animate-pulse" />
                        Featured Post
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-20 p-12 bg-foreground text-background rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-background/80 mb-8">
              Get weekly insights on design, development, and creative
              technology delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-background text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent-primary"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors duration-[var(--transition-fast)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
