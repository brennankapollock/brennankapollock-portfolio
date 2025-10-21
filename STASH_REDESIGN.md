# Stash Page Redesign

## Overview
Redesigned the Stash page to be clean, minimal, and image-focused, inspired by are.na and cosmos.so aesthetics.

## Key Changes

### 1. Visual Design Philosophy
- **Minimal, image-first approach**: No text visible until hover
- **Clean grid layout**: Tight 0.5rem gaps between cards
- **Flush header integration**: Toolbar seamlessly blends with top navigation (no floating gap)
- **Hover-only text overlays**: Information reveals on interaction only

### 2. Component Updates

#### `src/components/StashCard.jsx`
- Simplified card structure - removed specialized album/book card styling
- All image/link cards now use consistent minimal style
- Text only shows on hover via CSS overlay
- Quote and text cards always show content (no images)
- Removed complex conditional rendering

#### `src/components/StashToolbar.jsx`
- Removed search input and sort dropdown for cleaner UI
- Kept only essential category filters (MUSIC, BOOKS, FILMS, ART, QUOTES)
- Removed type filters (image, link, text, video)
- Minimal CLEAR button appears when filters are active

#### `src/data/stashItems.js`
- Updated placeholder image paths to use Unsplash for demo
- Real images make the hover interaction more meaningful
- All link/image items now have proper imageUrl values

### 3. CSS Architecture (`src/app/globals.css`)

#### Toolbar Styling
```css
.stash-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-bg);
  border-bottom: 1px solid #e1e5e9;
  padding: 1.5rem 3rem 1rem;
}
```
- Flush with top nav (no gap)
- Sticky positioning maintains visibility during scroll
- Clean border-bottom separation

#### Masonry Grid
```css
.stash-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
  padding: 2rem 3rem 4rem;
  grid-auto-flow: dense;
}
```
- Tight spacing (0.5rem) like are.na
- Fluid responsive columns (300px minimum)
- Dense packing for efficient use of space

#### Card Hover System
```css
.stash-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.96);
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 240ms ease;
}

.stash-card--image:hover .stash-card-overlay,
.stash-card--link:hover .stash-card-overlay {
  opacity: 1;
}
```
- Hidden by default (opacity: 0)
- Only shows on hover for image/link cards
- Text/quote cards always show content (different styling)

### 4. Responsive Behavior
- Mobile/tablet: Adjusted gaps and padding
- Maintains minimal aesthetic at all breakpoints
- Toolbar adapts padding for smaller screens

## Design Inspiration Match

### are.na Qualities
✅ Clean grid with tight spacing
✅ Image-first, minimal text
✅ Hover reveals metadata
✅ Simple, functional filtering

### cosmos.so Qualities  
✅ Masonry layout with visual focus
✅ Minimal UI, maximum content
✅ Seamless header integration
✅ Content-driven design

## Testing
- ✅ Hover interaction works on image/link cards
- ✅ Text/quote cards always visible
- ✅ Filtering by category works correctly
- ✅ No gap between header and toolbar
- ✅ Sticky toolbar stays at top during scroll
- ✅ Responsive at different screen sizes
- ✅ Real images load and display properly

## Files Modified
1. `src/components/StashCard.jsx` - Simplified card structure
2. `src/components/StashToolbar.jsx` - Minimal toolbar UI
3. `src/data/stashItems.js` - Updated with real image URLs
4. `src/app/globals.css` - Clean minimal styling system

## Next Steps (Optional Future Enhancements)
- Add masonry column height balancing for better visual flow
- Consider adding subtle animations on card hover
- Potentially add "view count" or "date added" on hover
- Could add keyboard navigation for accessibility
