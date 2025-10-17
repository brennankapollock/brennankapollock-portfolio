"use client";

import FlowingMenu from "@/components/FlowingMenu";
import { blogFileTree, blogPosts, getPostsByCategory } from "@/data/blogPosts";

export default function BlogPostList({
  selectedCategory = null,
  skipAnimation = false,
}) {
  const filteredPosts =
    selectedCategory &&
    Array.isArray(selectedCategory) &&
    selectedCategory.length > 0
      ? blogPosts.filter((post) =>
          selectedCategory.some((category) =>
            post.categories.includes(category),
          ),
        )
      : selectedCategory && typeof selectedCategory === "string"
        ? getPostsByCategory(selectedCategory)
        : blogPosts;

  const paletteByCategory = {
    "interface-design": {
      marqueeBackground: "linear-gradient(135deg, #fef9c3, #f97316)",
      marqueeTextColor: "#0f172a",
      marqueeChip: "linear-gradient(130deg, #fde68a 0%, #fb923c 100%)",
      marqueeBorder: "rgba(15, 23, 42, 0.2)",
    },
    development: {
      marqueeBackground: "linear-gradient(135deg, #cffafe, #0ea5e9)",
      marqueeTextColor: "#082f49",
      marqueeChip: "linear-gradient(130deg, #bae6fd 0%, #0ea5e9 100%)",
      marqueeBorder: "rgba(8, 47, 73, 0.25)",
    },
    process: {
      marqueeBackground: "linear-gradient(135deg, #ede9fe, #a855f7)",
      marqueeTextColor: "#3b0764",
      marqueeChip: "linear-gradient(130deg, #ddd6fe 0%, #a855f7 100%)",
      marqueeBorder: "rgba(59, 7, 100, 0.25)",
    },
    culture: {
      marqueeBackground: "linear-gradient(135deg, #fee2e2, #ef4444)",
      marqueeTextColor: "#450a0a",
      marqueeChip: "linear-gradient(130deg, #fecaca 0%, #ef4444 100%)",
      marqueeBorder: "rgba(69, 10, 10, 0.25)",
    },
  };

  const resolveCategoryLabel = (categories = []) => {
    if (!Array.isArray(categories) || categories.length === 0) return "";
    const [primarySlug] = categories;
    const primaryNode = blogFileTree[primarySlug];
    const primary = primaryNode?.displayName ?? primarySlug;
    return primary;
  };

  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const menuItems = sortedPosts.map((post) => ({
    id: post.id,
    link: `/blog/${post.slug}`,
    text: post.title,
    marqueeText: post.title,
    date: post.date,
    categoryLabel: resolveCategoryLabel(post.categories),
    excerpt: post.excerpt?.trim(),
    marqueeBackground:
      paletteByCategory[post.categories?.[0]]?.marqueeBackground ??
      "linear-gradient(135deg, #f1f5f9, #94a3b8)",
    marqueeTextColor:
      paletteByCategory[post.categories?.[0]]?.marqueeTextColor ?? "#020617",
    marqueeChip:
      paletteByCategory[post.categories?.[0]]?.marqueeChip ??
      "linear-gradient(130deg, #cbd5f5 0%, #94a3b8 100%)",
    marqueeBorder:
      paletteByCategory[post.categories?.[0]]?.marqueeBorder ??
      "rgba(2, 6, 23, 0.15)",
  }));

  return (
    <div className="blog-post-list">
      <div className="blog-list-header">
        <div className="blog-header-section">
          <h1 className="blog-main-title">Words</h1>
          <div className="blog-post-count">({sortedPosts.length})</div>
        </div>
      </div>
      <div className="words-table-header">
        <div className="words-header-label">/ DATE</div>
        <div className="words-header-label">/ NAME</div>
        <div className="words-header-label" aria-hidden="true" />
      </div>
      <FlowingMenu
        items={menuItems}
        skipAnimation={skipAnimation}
        renderItem={(item) => (
          <div className="words-row">
            <div className="words-meta">
              {item.categoryLabel && (
                <span className="words-meta-category">
                  {item.categoryLabel}
                </span>
              )}
              <div className="words-date">
                <span className="words-date-marker" aria-hidden="true" />
                <span className="words-date-text">{item.date}</span>
              </div>
            </div>
            <div className="words-content">
              <div className="words-title">{item.text}</div>
              {item.excerpt && <p className="words-excerpt">{item.excerpt}</p>}
            </div>
            <div className="words-action" aria-hidden="true">
              +
            </div>
          </div>
        )}
      />
    </div>
  );
}
