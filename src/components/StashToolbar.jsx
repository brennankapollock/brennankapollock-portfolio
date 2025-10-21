"use client";

import { useMemo } from "react";

export default function StashToolbar({ value, onChange, itemsCount }) {
  const categories = useMemo(
    () => ["music", "books", "films", "art", "quotes"],
    [],
  );
  const types = useMemo(() => ["image", "link", "text", "video"], []);

  const toggleInArray = (arr, item) => {
    const set = new Set(arr);
    if (set.has(item)) set.delete(item);
    else set.add(item);
    return Array.from(set);
  };

  const handleCategoryClick = (cat) => {
    onChange({ ...value, categories: toggleInArray(value.categories, cat) });
  };

  const handleTypeClick = (t) => {
    onChange({ ...value, types: toggleInArray(value.types, t) });
  };

  const handleClearAll = () => {
    onChange({ categories: [], types: [], sort: "newest", q: "" });
  };

  const hasActive =
    value.categories.length > 0 ||
    value.types.length > 0 ||
    value.q.trim().length > 0;

  return (
    <div className="stash-toolbar">
      <div className="stash-toolbar-row">
        <div className="stash-toolbar-left">
          <h1 className="blog-main-title">STASH</h1>
          <div className="blog-post-count">({itemsCount})</div>
        </div>
        <div className="stash-toolbar-right">
          <div className="stash-filters-group">
            {categories.map((cat) => {
              const selected = value.categories.includes(cat);
              const label = cat.toUpperCase();
              return (
                <button
                  key={cat}
                  type="button"
                  className={`chip${selected ? " chip--selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {hasActive && (
            <button
              type="button"
              className="chip chip--ghost"
              onClick={handleClearAll}
            >
              CLEAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
