'use client';

import { useState } from 'react';
import { stashCategories, getAllTypes } from '@/data/stashItems';

export default function StashSidebar({ onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState(new Set(['category', 'type']));
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedTypes, setSelectedTypes] = useState(new Set());

  const toggleSection = (sectionName) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const handleCategoryToggle = (categoryName) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryName)) {
      newSelected.delete(categoryName);
    } else {
      newSelected.add(categoryName);
    }
    setSelectedCategories(newSelected);

    if (onFilterChange) {
      onFilterChange({
        categories: Array.from(newSelected),
        types: Array.from(selectedTypes)
      });
    }
  };

  const handleTypeToggle = (typeName) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(typeName)) {
      newSelected.delete(typeName);
    } else {
      newSelected.add(typeName);
    }
    setSelectedTypes(newSelected);

    if (onFilterChange) {
      onFilterChange({
        categories: Array.from(selectedCategories),
        types: Array.from(newSelected)
      });
    }
  };

  const allTypes = getAllTypes();

  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-header">
        <h3>/ FILTERS</h3>
      </div>

      <div className="filter-section">
        {/* Category Filter */}
        <div className="filter-topic">
          <div
            className="topic-header"
            onClick={() => toggleSection('category')}
          >
            <span className="topic-arrow">
              {expandedSections.has('category') ? '▼' : '▶'}
            </span>
            <span className="topic-icon">📁</span>
            <span className="topic-name">Category</span>
          </div>

          {expandedSections.has('category') && (
            <div className="topic-items">
              {Object.values(stashCategories).map((category) => {
                const isSelected = selectedCategories.has(category.name);
                return (
                  <div key={category.name} className="topic-item">
                    <input
                      type="checkbox"
                      className="topic-checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(category.name)}
                    />
                    <span className="topic-item-name">{category.displayName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Type Filter */}
        <div className="filter-topic">
          <div
            className="topic-header"
            onClick={() => toggleSection('type')}
          >
            <span className="topic-arrow">
              {expandedSections.has('type') ? '▼' : '▶'}
            </span>
            <span className="topic-icon">🔖</span>
            <span className="topic-name">Type</span>
          </div>

          {expandedSections.has('type') && (
            <div className="topic-items">
              {allTypes.map((type) => {
                const isSelected = selectedTypes.has(type);
                const displayName = type.charAt(0).toUpperCase() + type.slice(1);
                return (
                  <div key={type} className="topic-item">
                    <input
                      type="checkbox"
                      className="topic-checkbox"
                      checked={isSelected}
                      onChange={() => handleTypeToggle(type)}
                    />
                    <span className="topic-item-name">{displayName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}