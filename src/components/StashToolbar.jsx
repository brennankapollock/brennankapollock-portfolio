"use client";

import { useMemo } from "react";

// StashToolbar: minimal, brutalist toolbar replacing the left sidebar
// - Sticky at top of the scrollable content area
// - Multi-select chips for categories and types
// - Sort select
// - Search input with clear
// Controlled via `value` and `onChange`
// value shape: { categories: string[], types: string[], sort: string, q: string }
export default function StashToolbar({ value, onChange, itemsCount }) {
  const categories = useMemo(
    () => ["music", "books", "films", "art", "quotes"],
    []
  );
  const types = useMemo(
    () => ["image", "link", "text", "video"],
    []
  );
  const sortOptions = useMemo(
    () => [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
      { value: "title", label: "Title A–Z" },
      { value: "type", label: "Type" },
    ],
    []
  );

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

  const handleSortChange = (e) => {
    onChange({ ...value, sort: e.target.value });
  };

  const handleSearchChange = (e) => {
    onChange({ ...value, q: e.target.value });
  };

  const handleClearSearch = () => {
    onChange({ ...value, q: "" });
  };

  const handleClearAll = () => {
    onChange({ categories: [], types: [], sort: "newest", q: "" });
  };

  const hasActive =
    value.categories.length > 0 ||
    value.types.length > 0 ||
    value.q.trim().length > 0 ||
    value.sort !== "newest";

  return (
    <div className="stash-toolbar" role="toolbar" aria-label="Stash controls">
      <div className="stash-toolbar-row">
        <div className="stash-toolbar-left">
          <h1 className="blog-main-title">STASH</h1>
          <div className="blog-post-count">({itemsCount})</div>
        </div>
        <div className="stash-toolbar-right">
          <div className="stash-search">
            <input
              type="search"
              value={value.q}
              onChange={handleSearchChange}
              placeholder="Search stash"
              className="stash-search-input"
              aria-label="Search stash"
            />
            {value.q && (
              <button
                type="button"
                className="stash-search-clear"
                aria-label="Clear search"
                onClick={handleClearSearch}
              >
                ×
              </button>
            )}
          </div>

          <div className="stash-filters-group" aria-label="Category filters">
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

          <div className="stash-filters-group" aria-label="Type filters">
            {types.map((t) => {
              const selected = value.types.includes(t);
              const label = t.toUpperCase();
              return (
                <button
                  key={t}
                  type="button"
                  className={`chip${selected ? " chip--selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => handleTypeClick(t)}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="stash-sort">
            <label htmlFor="stash-sort" className="sr-only">Sort</label>
            <select
              id="stash-sort"
              value={value.sort}
              onChange={handleSortChange}
              className="stash-sort-select"
              aria-label="Sort results"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {hasActive && (
            <button type="button" className="chip chip--ghost" onClick={handleClearAll}>
              CLEAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
