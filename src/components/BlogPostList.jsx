'use client';

import Link from 'next/link';
import { blogPosts, getPostsByCategory } from '@/data/blogPosts';

export default function BlogPostList({ selectedCategory = null }) {
  const filteredPosts = selectedCategory && Array.isArray(selectedCategory) && selectedCategory.length > 0
    ? blogPosts.filter(post =>
        selectedCategory.some(category => post.categories.includes(category))
      )
    : selectedCategory && typeof selectedCategory === 'string'
    ? getPostsByCategory(selectedCategory)
    : blogPosts;

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="blog-post-list">
      <div className="blog-list-header">
        <div className="blog-header-section">
          <h1 className="blog-main-title">Blog</h1>
          <div className="blog-post-count">({sortedPosts.length})</div>
        </div>
      </div>

      <div className="blog-table">
        <div className="blog-table-header">
          <div className="blog-table-col blog-col-date">/ DATE</div>
          <div className="blog-table-col blog-col-name">/ NAME</div>
          <div className="blog-table-col blog-col-action"></div>
        </div>

        <div className="blog-table-body">
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-table-row"
            >
              <div className="blog-table-col blog-col-date">
                <span className="blog-date-marker">●</span>
                <span>{post.date}</span>
              </div>
              <div className="blog-table-col blog-col-name">
                <span className="blog-post-title">{post.title}</span>
              </div>
              <div className="blog-table-col blog-col-action">
                <span className="blog-action-icon">+</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}