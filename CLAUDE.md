# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS v4 via PostCSS plugin
- **Lint/Format**: Biome (linter + formatter)
- **Build Tool**: Next with Turbopack enabled

## Common Commands

- **Development server**: `npm run dev` (starts on <http://localhost:3000>)
- **Production build**: `npm run build`
- **Production server**: `npm start` (after build)
- **Lint code**: `npm run lint`
- **Format code**: `npm run format`
- **Install dependencies**: `npm install`

Note: No test framework is currently configured.

## Architecture & Structure

### Directory Layout

- **Source root**: `src/`
- **App Router**: `src/app/` (Next.js App Router structure)
- **Static assets**: `public/`

### Key Files

- **Root layout**: `src/app/layout.js` - Defines HTML shell, loads Geist fonts via next/font, sets up CSS variables
- **Home page**: `src/app/page.js` - Landing page using server components
- **Global styles**: `src/app/globals.css` - Tailwind CSS v4 with inline @theme declarations
- **PostCSS config**: `postcss.config.mjs` - Loads @tailwindcss/postcss plugin for Tailwind v4
- **Path aliases**: `jsconfig.json` - Maps @/*to ./src/* for imports

### Styling System

- **Tailwind CSS v4**: No tailwind.config.* file needed - theme tokens declared inline in globals.css
- **CSS Variables**: --font-geist-sans and --font-geist-mono exposed from layout.js
- **Dark mode**: Handled via CSS variables adjusted in globals.css

### Development Notes

- **Package manager**: Use npm (package-lock.json present)
- **Biome configuration**: Enables recommended rules for Next.js and React, organizes imports automatically
- **Next.js config**: Minimal configuration (next.config.mjs is mostly empty)
- **Turbopack**: Enabled for both dev and build via --turbopack flag

## Design Philosophy

This is a minimal yet expressive portfolio and blog platform with:

- Clean, modern typography hierarchy
- Asymmetrical balanced layouts with generous negative space
- Strategic use of accent colors
- Performance-focused static site generation
- Mobile-first responsive design

Refer to `style-guide.md` for detailed design specifications and `WARP.md` for additional technical context.
