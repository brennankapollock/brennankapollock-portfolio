"use client";

import { useState, useEffect, useRef } from "react";
import StashCard from "./StashCard";

const ITEMS_PER_PAGE = 12;

export default function StashMasonry({ items }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Initial load and reset when items change
  useEffect(() => {
    const initialItems = items.slice(0, ITEMS_PER_PAGE);
    setDisplayedItems(initialItems);
    setPage(1);
    setHasMore(items.length > ITEMS_PER_PAGE);
  }, [items]);

  // Load more items
  const loadMore = () => {
    const nextPage = page + 1;
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newItems = items.slice(startIndex, endIndex);

    if (newItems.length > 0) {
      setDisplayedItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);
    }

    if (endIndex >= items.length) {
      setHasMore(false);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadMore();
      }
    }, options);

    const currentTarget = loadMoreRef.current;
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (observerRef.current && currentTarget) {
        observerRef.current.unobserve(currentTarget);
      }
    };
  }, [hasMore, page, items]);

  return (
    <>
      <div className="stash-masonry">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            className="stash-card-animate"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <StashCard item={item} />
          </div>
        ))}
      </div>

      {/* Loading indicator and intersection observer target */}
      {hasMore && (
        <div ref={loadMoreRef} className="stash-loading">
          <div className="stash-loading-indicator">
            <span className="stash-loading-dot"></span>
            <span className="stash-loading-dot"></span>
            <span className="stash-loading-dot"></span>
          </div>
        </div>
      )}

      {displayedItems.length === 0 && (
        <div className="stash-empty-state">
          <p>No items match your filters</p>
        </div>
      )}
    </>
  );
}
