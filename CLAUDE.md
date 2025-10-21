# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS v4 via PostCSS plugin
- **Backend**: Appwrite (cloud-hosted BaaS for CMS, auth, storage)
- **Lint/Format**: Biome (linter + formatter)
- **Build Tool**: Next with Turbopack enabled
- **Package Manager**: npm (do not use yarn or pnpm)

## Common Commands

### Development
- `npm run dev` - Start development server on <http://localhost:3000>
- `npm run build` - Create production build
- `npm start` - Run production server (after build)
- `npm run lint` - Check code with Biome
- `npm run format` - Format code with Biome

### Appwrite Setup
- `npm run setup-appwrite` - Automated Appwrite database/collection setup (interactive)
- `npm run migrate` - Migrate existing content from `src/data/` to Appwrite

Note: No test framework is currently configured.

## Architecture & Structure

### Directory Layout

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # CMS admin panel (/admin, /admin/blog, /admin/stash)
│   ├── api/               # API routes (admin operations)
│   ├── blog/              # Blog listing & individual posts
│   ├── stash/             # Visual inspiration gallery
│   ├── work/              # Portfolio/projects
│   ├── about/             # About page
│   └── layout.js          # Root layout with font loading
├── components/            # React components (mix of .js/.jsx)
│   ├── home/             # Homepage-specific components
│   ├── about/            # About page components
│   ├── ui/               # Reusable UI components
│   └── reframe-ui/       # Third-party UI library components
├── data/                  # Static content (blog posts, projects, stash items)
├── lib/
│   ├── appwrite/         # Appwrite client/server configuration
│   │   ├── config.js     # Client-side Appwrite setup
│   │   ├── server.js     # Server-side Appwrite setup (admin client)
│   │   ├── auth.js       # Authentication helpers
│   │   └── client-queries.js # Client-side query functions
│   └── utils.js          # General utility functions
└── inspiration/          # Design reference images

public/
├── fonts/                # Custom fonts (Printvetica, DepartureMono)
├── home-images/          # Homepage imagery
├── about-images/         # About page imagery
└── icons/                # Custom SVG icons
```

### Content Management

The site uses a **hybrid content approach**:

1. **Static Content** (`src/data/`):
   - `blogPosts.js` - Blog posts with file tree structure for navigation
   - `stashItems.js` - Visual inspiration items (images, links, quotes, videos)
   - `projects.js` - Portfolio projects
   - `aboutMe.md` - About page content

2. **Appwrite CMS** (`/admin` panel):
   - **Authentication**: Email/password login via Appwrite Auth
   - **Blog Posts**: Create/edit posts with metadata (title, slug, content, categories)
   - **Stash Items**: Upload images and manage inspiration gallery
   - **Drafts**: Save work-in-progress content
   - **Storage**: Image uploads to Appwrite Storage bucket

**Key Appwrite Configuration** (`.env.local`):
```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=...
NEXT_PUBLIC_APPWRITE_DATABASE_ID=...
NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_STASH_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_DRAFTS_COLLECTION_ID=...
NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=...
APPWRITE_API_KEY=...  # Server-side only
```

See `README_APPWRITE.md` for complete setup instructions.

### Styling System

**Tailwind CSS v4** (no `tailwind.config.*` file):
- Theme tokens declared inline in `src/app/globals.css`
- Design system uses CSS custom properties (e.g., `--color-accent-primary`, `--rule-thick`)
- Light mode only (`:root` color-scheme)

**Typography**:
- `--font-display`: Printvetica (custom display font)
- `--font-geist-sans`: Geist Sans (via `geist/font`)
- `--font-geist-mono`: Geist Mono (via `geist/font`)
- `--font-departure-mono`: Departure Mono (custom monospace)
- `--font-words`: Alias for Departure Mono (used for reading text)

**Editorial Accent Colors** (inspired by Stedelijk Museum):
- Yellow: `#ffd700`
- Green: `#00ff88`
- Red: `#ff3b30`

### Key Files

- `src/app/layout.js` - Root layout with font loading, metadata, Header component
- `src/app/globals.css` - CSS custom properties and Tailwind CSS v4 imports
- `postcss.config.mjs` - Loads `@tailwindcss/postcss` for Tailwind v4
- `jsconfig.json` - Path alias (`@/*` → `./src/*`)
- `biome.json` - Linter/formatter configuration with Next.js and React rules

## Design Philosophy

**Minimal yet expressive portfolio and blog** with:
- Clean, modern typography hierarchy
- Asymmetrical balanced layouts with generous negative space
- Strategic use of editorial accent colors
- Performance-focused static site generation
- Mobile-first responsive design

**Stash Page** (recently redesigned):
- Minimal image-first UI
- Hover text overlays
- Streamlined toolbar with filters
- Masonry grid layout

## Development Workflow

1. **Local Development**:
   - Run `npm run dev`
   - Admin panel: <http://localhost:3000/admin>
   - Blog: <http://localhost:3000/blog>
   - Stash: <http://localhost:3000/stash>

2. **Content Creation**:
   - **Option A**: Edit static files in `src/data/` (requires rebuild)
   - **Option B**: Use admin panel at `/admin` (requires Appwrite setup)

3. **Appwrite Setup** (first time):
   - Create Appwrite project at <https://cloud.appwrite.io>
   - Run `npm run setup-appwrite` (creates database, collections, bucket)
   - Create admin user in Appwrite console (Auth → Users)
   - Optionally run `npm run migrate` to import existing content

4. **Code Quality**:
   - Biome handles both linting and formatting
   - Run `npm run lint` before committing
   - Run `npm run format` to auto-fix formatting issues

## Important Notes

- **File Extensions**: Components use both `.js` and `.jsx` (not consistent)
- **Server vs Client**: Appwrite has separate client (`config.js`) and server (`server.js`) setups
- **Admin Routes**: Protected via Appwrite Auth, check `src/lib/appwrite/auth.js`
- **No Dark Mode**: Design system is light-only (see `globals.css`)
- **Biome Config**: Disables `noUnknownAtRules` for Tailwind v4 compatibility
