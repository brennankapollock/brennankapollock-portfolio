'use client';

import { useState } from 'react';
import BlogSidebar from '@/components/BlogSidebar';
import BlogPostList from '@/components/BlogPostList';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <div className="blog-layout">
      <div className="blog-container">
        <BlogSidebar
          currentCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <BlogPostList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
