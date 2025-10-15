'use client';

import { useState, useEffect } from 'react';
import BlogSidebar from '@/components/BlogSidebar';
import BlogPostList from '@/components/BlogPostList';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <div className="blog-layout">
      <div className="blog-container">
        <BlogSidebar
          currentCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <BlogPostList 
          selectedCategory={selectedCategory}
          skipAnimation={!isInitialLoad}
        />
      </div>
    </div>
  );
}
