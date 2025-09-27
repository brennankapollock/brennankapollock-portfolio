# Figma Design System Rules for brennankapollock-portfolio

This document provides comprehensive rules for integrating Figma designs with the brennankapollock-portfolio codebase using the Model Context Protocol (MCP).

## Project Overview

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS v4 via PostCSS plugin
- **Build System**: Next.js with Turbopack enabled
- **Linting**: Biome (linter + formatter)

## 1. Design Token Definitions

### Location and Structure
Design tokens are defined in: `src/app/globals.css` lines 4-47

```css
:root {
    color-scheme: light;

    /* Colors */
    --color-bg: #ffffff;
    --color-fg: #111111;
    --color-muted: #6b7280;
    --color-accent-primary: #0066ff;

    /* Editorial accent colors inspired by Stedelijk */
    --color-accent-yellow: #ffd700;
    --color-accent-green: #00ff88;
    --color-accent-red: #ff3b30;

    /* Rules and spacing tokens */
    --rule-thick: 8px;
    --container-max: 80rem; /* ~1280px */

    /* Font variables */
    --font-display: var(--font-display);
    --font-geist-sans: var(--font-geist, ui-sans-serif, system-ui, ...);
    --font-geist-mono: var(--font-geist-mono, ui-monospace, ...);
}
```

### Token Categories
1. **Colors**: Background (`--color-bg`), foreground (`--color-fg`), muted (`--color-muted`), primary accent (`--color-accent-primary`)
2. **Editorial Accents**: Yellow, green, red inspired by Stedelijk Museum
3. **Typography**: Three font families (display serif, sans-serif, monospace)
4. **Layout**: Container max-width and rule thickness tokens
5. **Spacing**: Museum-style layout tokens (`--header-height`, `--nav-gap`)

### Token Format
- CSS Custom Properties (variables)
- Light mode only (no dark mode system)
- Inline @theme declarations in Tailwind v4 approach

## 2. Component Library Structure

### Location
Components are organized in: `src/components/`

```
src/components/
├── Header.jsx                 # Main navigation component
├── Footer.jsx                 # Site footer
├── Navigation.js              # Navigation utilities
├── PageFade.jsx              # Page transition animations
├── FadeIn.jsx                # Fade-in animations
├── RuleBand.jsx              # Stedelijk-style thick rule bands
├── StashGrid.jsx             # Grid layout for portfolio items
├── BlogList.jsx              # Blog post listing
├── BlogPostList.jsx          # Blog post list view
├── BlogPostMetadata.jsx      # Blog metadata display
├── BlogSidebar.jsx           # Blog navigation sidebar
├── ReadingTitle.jsx          # Sticky reading title
├── home/                     # Home page specific components
│   ├── HeroSection.js
│   ├── FeaturedProjects.js
│   └── LatestWriting.js
└── ui/                       # UI components
    ├── AboutHero.jsx         # About page hero with animations
    └── skiper-ui/           # Third-party UI components
```

### Component Architecture
- **Client Components**: Use `'use client'` directive for interactive components
- **Server Components**: Default for static content
- **Styling**: Utility classes + custom CSS classes defined in globals.css
- **Navigation**: Active state management with `usePathname()` hook

### Key Component Patterns
1. **Header Navigation**: Museum-style transparent overlay header with pill navigation
2. **Typography Hierarchy**: Editorial display fonts with responsive scaling
3. **Layout Containers**: `.container-site` with responsive padding
4. **Animation Components**: Framer Motion for complex animations (AboutHero)

## 3. Frameworks & Libraries

### Core Stack
- **React**: 19.1.0
- **Next.js**: 15.5.3 (App Router)
- **Tailwind CSS**: v4 (no config file, inline theme)
- **PostCSS**: `@tailwindcss/postcss` plugin

### Typography
- **Geist Font**: Sans (`GeistSans`) and Mono (`GeistMono`) from `geist/font`
- **Display Font**: Local font `Printvetica.otf` loaded via `next/font/local`

### Animation (Optional)
- **Framer Motion**: Used in `AboutHero.jsx` for advanced scroll animations
- **CSS Transitions**: Defined in globals.css for hover states and page transitions

### Build Tools
- **Turbopack**: Enabled for both dev (`--turbopack`) and build
- **Biome**: Linting and formatting with Next.js + React rules

## 4. Asset Management

### Location
Static assets stored in: `public/`

```
public/
├── favicon.ico
├── *.svg                    # Icon assets (next.svg, vercel.svg, etc.)
├── placeholder-*.jpg        # Placeholder images for portfolio/blog
├── home-images/            # Home page specific images
└── *.jpg, *.png, *.webp   # Various image assets
```

### Asset Reference Patterns
- **Next.js Static Assets**: Referenced via `/filename.ext` (public directory)
- **Image Optimization**: Uses Next.js built-in image optimization
- **No CDN**: Assets served directly from public directory

### Asset Naming Convention
- Descriptive names: `placeholder-work-1.jpg`, `placeholder-stash-2.jpg`
- Category prefixes: `placeholder-*`, `home-images/*`
- Lowercase with hyphens for multi-word names

## 5. Icon System

### Current State
- **Basic SVG Icons**: Stored in `public/` directory
- **Inline SVG**: Custom SVG paths in components (e.g., LinePath in AboutHero)
- **No Icon Library**: No dedicated icon system like Lucide, Heroicons, etc.

### Icon Usage Patterns
```jsx
// Inline SVG in components
<svg width="..." height="..." viewBox="..." className="...">
  <path d="..." />
</svg>

// Static SVG assets
<img src="/icon-name.svg" alt="..." />
```

### Recommendations for Figma Integration
- Consider icon components for consistency
- Use viewBox and CSS sizing for scalability
- Maintain stroke-width consistency across icons

## 6. Styling Approach

### CSS Methodology
- **Tailwind v4**: Utility-first with inline @theme declarations
- **Custom CSS Classes**: Defined in `globals.css` for complex components
- **CSS Variables**: Extensive use for design tokens and theming
- **No CSS Modules**: Direct CSS classes and Tailwind utilities

### Responsive Design
```css
/* Mobile-first responsive approach */
.container-site {
    padding-left: 1rem;
    padding-right: 1rem;
}

@media (min-width: 768px) {
    .container-site {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}
```

### Typography System
Custom typography scale with responsive fluid sizing:
```css
.display-hero {
    font-size: clamp(4rem, 12vw + 1rem, 16rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
}
```

### Layout Approach
- **Museum Layout**: Inspired by Stedelijk Museum with full-viewport sections
- **Editorial Grid**: 12-column CSS Grid for content layout
- **Container System**: Max-width containers with responsive padding

## 7. Project Structure

### Directory Organization
```
brennankapollock-portfolio/
├── src/                     # Source code root
│   ├── app/                # Next.js App Router
│   │   ├── layout.js       # Root layout with fonts
│   │   ├── page.js         # Home page
│   │   ├── globals.css     # Global styles & design tokens
│   │   └── loading.js      # Loading UI
│   ├── components/         # React components
│   ├── data/              # Static data and content
│   │   ├── aboutMe.md     # About page content
│   │   └── blogPosts.js   # Blog post data
│   ├── fonts/             # Local font files
│   ├── lib/               # Utility functions
│   │   └── utils.js
│   └── styles/            # Additional stylesheets (if needed)
├── public/                # Static assets
├── CLAUDE.md             # Project instructions
└── style-guide.md        # Design specifications
```

### Feature Organization
- **Page-specific components**: Organized in subdirectories (`home/`, `ui/`)
- **Shared components**: Root level of `src/components/`
- **Static content**: Markdown files in `src/data/`

## Figma Integration Guidelines

### When Converting Figma Designs

1. **Color Mapping**
   - Map Figma colors to existing CSS variables
   - Use editorial accent colors for highlights
   - Maintain light-mode-only approach

2. **Typography**
   - Use existing typography classes (`.display-hero`, `.display-xl`, etc.)
   - Apply font families via CSS variables (`var(--font-display)`)
   - Maintain responsive fluid sizing approach

3. **Layout**
   - Use `.container-site` for page-width containers
   - Apply `.editorial-grid` for complex layouts
   - Maintain museum-style full-viewport sections

4. **Components**
   - Create new components in appropriate `src/components/` subdirectories
   - Follow existing naming conventions
   - Use client components only when interactivity is required

5. **Assets**
   - Place images in `public/` directory with descriptive names
   - Use Next.js Image component for optimization
   - Maintain consistent naming patterns

6. **Responsive Design**
   - Follow mobile-first approach
   - Use clamp() for fluid typography
   - Test across museum-style layout breakpoints

### Code Generation Patterns

```jsx
// Typical component structure
'use client'; // Only if interactive

import React from 'react';
import Link from 'next/link'; // For navigation

export default function ComponentName() {
  return (
    <section className="container-site">
      <h1 className="display-hero">
        Title Text
      </h1>
      <p className="copy-lg text-color-muted">
        Description text
      </p>
    </section>
  );
}
```

This structure ensures consistency with the existing codebase while providing clear guidelines for integrating Figma designs into the portfolio system.