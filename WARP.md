# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js 15 (App Router) with React 19
- Language: JavaScript (no TypeScript)
- Styling: Tailwind CSS v4 via PostCSS plugin
- Lint/format: Biome (linter + formatter)
- Directory roots: source under src/, routes in src/app
- Build/dev implementation: Next with Turbopack (via --turbopack in scripts)

Common commands (npm)
- Install deps: npm install
- Start dev server (http://localhost:3000): npm run dev
- Build production bundle: npm run build
- Start production server (after build): npm start
- Lint (Biome): npm run lint
- Format (Biome): npm run format
- Tests: No test runner is configured in this repository (no commands available). Running a single test is not applicable until a test framework is added.

High-level architecture
- App Router structure (src/app)
  - Root layout: src/app/layout.js defines HTML shell, loads Google fonts via next/font (Geist and Geist_Mono), exposes CSS vars (--font-geist-sans, --font-geist-mono), and sets basic metadata.
  - Home route: src/app/page.js (server component by default) renders the landing UI and uses next/image for optimized assets.
- Styling and theming
  - Global styles: src/app/globals.css uses Tailwind CSS v4 (no tailwind.config.*). Theme tokens are declared with @theme inline, mapping to CSS variables defined on :root and adjusted for dark mode.
  - PostCSS: postcss.config.mjs loads the @tailwindcss/postcss plugin required for Tailwind v4.
- Static assets: public/ contains SVGs referenced by the home page.
- Configuration and tooling
  - next.config.mjs is empty (defaults). No custom Next features are toggled here.
  - Path alias: jsconfig.json maps @/* to ./src/* for cleaner imports.
  - Biome: biome.json enables recommended rules (including next and react domains) and organizes imports; lint and format scripts call Biome directly.

Notes
- Package manager: npm is assumed (package-lock.json present). Avoid generating additional lockfiles with other package managers.
- No API routes or custom server code are present; the app currently serves static/dynamic pages from src/app.
