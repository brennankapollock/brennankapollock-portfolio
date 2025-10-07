'use client';

import { useState } from 'react';
import { populateFileTree, getPostsByPath } from '@/data/blogPosts';

export default function BlogSidebar({ currentCategory = null, onCategorySelect = null }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['topic']));
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const fileTree = populateFileTree();

  const toggleFolder = (folderPath) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCategoryToggle = (category, event) => {
    event.stopPropagation();
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);

    if (onCategorySelect) {
      onCategorySelect(Array.from(newSelected));
    }
  };

  const handleFolderClick = (folderPath, hasChildren) => {
    if (hasChildren) {
      toggleFolder(folderPath);
    }
  };

  const renderTreeItem = (item, path = '', level = 0) => {
    const isExpanded = expandedFolders.has(path);
    const indentStyle = { paddingLeft: `${level * 12}px` };

    if (item.type === 'folder') {
      const hasChildren = Object.keys(item.children).length > 0;
      const postCount = getPostsByPath(item.name).length;
      const isSelected = selectedCategories.has(item.name);

      return (
        <div key={path} className="file-tree-item">
          <div
            className="file-tree-button folder"
            style={indentStyle}
          >
            <div className="file-tree-checkbox-wrapper">
              <input
                type="checkbox"
                className="file-tree-checkbox"
                checked={isSelected}
                onChange={(e) => handleCategoryToggle(item.name, e)}
              />
            </div>
            <div
              className="file-tree-folder-toggle"
              onClick={() => handleFolderClick(path, hasChildren)}
            >
              <span className="file-tree-icon">
                {hasChildren ? (isExpanded ? '▼' : '▶') : '📁'}
              </span>
              <span className="file-tree-name">{item.displayName}</span>
              {postCount > 0 && <span className="file-tree-count">({postCount})</span>}
            </div>
          </div>

          {isExpanded && hasChildren && (
            <div className="file-tree-children">
              {Object.entries(item.children).map(([childName, childItem]) =>
                renderTreeItem(childItem, `${path}/${childName}`, level + 1)
              )}
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'file') {
      return (
        <div key={path} className="file-tree-item">
          <button
            className="file-tree-button file"
            style={indentStyle}
          >
            <span className="file-tree-icon">📄</span>
            <span className="file-tree-name">{item.displayName}</span>
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-header">
        <h3>/ FILTERS</h3>
      </div>

      <div className="filter-section">
        <div className="filter-topic">
          <div
            className="topic-header"
            onClick={() => toggleFolder('topic')}
          >
            <span className="topic-arrow">
              {expandedFolders.has('topic') ? '▼' : '▶'}
            </span>
            <span className="topic-icon">📁</span>
            <span className="topic-name">Topic</span>
          </div>

          {expandedFolders.has('topic') && (
            <div className="topic-items">
              {Object.entries(fileTree).map(([folderName, folderItem]) => {
                const postCount = getPostsByPath(folderItem.name).length;
                const isSelected = selectedCategories.has(folderItem.name);

                return (
                  <div key={folderName} className="topic-item">
                    <input
                      type="checkbox"
                      className="topic-checkbox"
                      checked={isSelected}
                      onChange={(e) => handleCategoryToggle(folderItem.name, e)}
                    />
                    <span className="topic-item-name">{folderItem.displayName}</span>
                    <span className="topic-item-count">({postCount})</span>
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