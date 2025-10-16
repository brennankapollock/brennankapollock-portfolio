'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FileTree, Folder, File } from '@/components/reframe-ui/file-tree';
import { getPostsByPath, populateFileTree } from '@/data/blogPosts';

function BitmapCheckbox({ checked }) {
  return (
    <Image
      src={checked ? '/icons/checkbox-on-bitmap.svg' : '/icons/checkbox-off-bitmap.svg'}
      alt={checked ? 'Checked' : 'Unchecked'}
      width={12}
      height={12}
      className="words-checkbox"
      unoptimized
    />
  );
}

export default function BlogSidebar({ currentCategory = null, onCategorySelect = null }) {
  const [selectedCategories, setSelectedCategories] = useState(new Set(currentCategory ?? []));
  const pendingNotifyRef = useRef(null);
  const skipNotifyRef = useRef(false);
  const fileTree = useMemo(() => populateFileTree(), []);

  const categoryEntries = useMemo(() => {
    return Object.values(fileTree).map((folderItem) => ({
      id: folderItem.name,
      label: folderItem.displayName,
      count: getPostsByPath(folderItem.name).length,
    }));
  }, [fileTree]);

  useEffect(() => {
    if (!currentCategory) {
      skipNotifyRef.current = true;
      setSelectedCategories(new Set());
      return;
    }
    const categories = Array.isArray(currentCategory) ? currentCategory : [currentCategory];
    skipNotifyRef.current = true;
    setSelectedCategories(new Set(categories));
  }, [currentCategory]);

  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      pendingNotifyRef.current = Array.from(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!onCategorySelect) return;
    if (skipNotifyRef.current) {
      skipNotifyRef.current = false;
      pendingNotifyRef.current = null;
      return;
    }
    if (!pendingNotifyRef.current) return;
    const payload = pendingNotifyRef.current;
    pendingNotifyRef.current = null;
    onCategorySelect(payload);
  }, [selectedCategories, onCategorySelect]);

  return (
    <div className="blog-sidebar">
      <div className="filter-section words-file-tree-desktop">
        <div className="blog-sidebar-header">
          <h3>/ FILTERS</h3>
        </div>
        <FileTree
          className="words-file-tree"
          initialExpandedItems={['topic']}
          indicator={false}
          openIcon={<Image src="/icons/folder-open-bitmap.svg" alt="Open folder" width={16} height={12} unoptimized />}
          closeIcon={<Image src="/icons/folder-bitmap.svg" alt="Closed folder" width={16} height={12} unoptimized />}
        >
          <Folder value="topic" element="Topic" className="words-folder">
            {categoryEntries.map((entry) => {
              const isSelected = selectedCategories.has(entry.id);
              return (
                <File
                  key={entry.id}
                  value={entry.id}
                  className="words-tree-entry"
                  fileIcon={<BitmapCheckbox checked={isSelected} />}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCategory(entry.id);
                  }}
                >
                  <span className="words-tree-name">{entry.label}</span>
                  <span className="words-tree-count">({entry.count})</span>
                </File>
              );
            })}
          </Folder>
        </FileTree>
      </div>

      <div className="filter-section words-mobile-filter">
        <div className="blog-sidebar-header">
          <h3>/ FILTERS</h3>
        </div>

        <div className="words-mobile-filter-row">
          <div className="blog-mobile-topic">
            <Image src="/icons/folder-bitmap.svg" alt="Topic" width={18} height={14} unoptimized />
            <span>Topic</span>
          </div>

          <div className="words-chip-panel" role="list">
            {categoryEntries.map((entry) => {
              const isSelected = selectedCategories.has(entry.id);
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`words-chip${isSelected ? ' words-chip--active' : ''}`}
                  onClick={() => toggleCategory(entry.id)}
                >
                  <span>{entry.label}</span>
                  <span className="words-chip-count"> ({entry.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}