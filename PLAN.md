# Portfolio Redesign: Experimental Editorial Direction

## Vision

Transform the portfolio from a clean brutalist/Stedelijk aesthetic into a **dark, textured, punk-editorial experience** inspired by The Face Magazine, 032C, xerox/low-ink culture, naive design, and future medieval aesthetics. The site should feel like opening an underground magazine — gritty, expressive, and unmistakably human-made.

**Key decisions:**
- **Dark & moody** color scheme (black/near-black backgrounds)
- **Experimental typography** for display/headlines only; body text stays readable
- **Real scanned textures** layered with CSS grain for authentic xerox/low-ink feel
- **Magazine spread format** for the Work page
- Existing blog file-tree sidebar, stash masonry/filtering, and admin panel stay intact

---

## Phase 1: Foundation — Visual System Overhaul

### 1A. Color Palette Shift (`globals.css`)

Replace the current light theme with a dark editorial palette:

```
--color-bg:            #0a0a0a    (near-black)
--color-bg-elevated:   #141414    (cards, panels)
--color-bg-surface:    #1a1a1a    (sidebar, toolbar)
--color-fg:            #e8e4de    (warm off-white text — like aged paper)
--color-fg-muted:      #8a8578    (warm gray, secondary text)
--color-fg-dim:        #4a4640    (tertiary, metadata)
--color-accent-red:    #ff3b30    (keep — 032C signature red)
--color-accent-yellow: #ffd700    (keep — editorial highlight)
--color-accent-green:  #00ff88    (keep — status/availability)
--color-accent-blue:   remove or reduce — feels too corporate for this aesthetic
--color-xerox:         #c4bfb3    (low-ink warm gray for faded elements)
--color-scan-artifact: rgba(255,255,255,0.03) (subtle scan-line highlight)
```

### 1B. Texture & Grain System

**New assets to create/source** (place in `public/textures/`):
- `paper-grain.png` — Scanned paper texture (tileable, ~400x400)
- `xerox-noise.png` — Heavy photocopy grain (tileable)
- `scan-line.png` — Subtle horizontal scan line artifact
- `paper-crumple.png` — Scrunched paper overlay for hero sections
- `ink-bleed.png` — Low-ink bleed/dissolve edge effect

**CSS grain overlay system** — Add to `globals.css`:
- `.grain` — Base noise overlay using `background-image` with a small repeating noise tile + CSS `mix-blend-mode: overlay` at low opacity (0.04-0.08)
- `.grain-heavy` — Heavier grain for hero sections (opacity 0.12-0.15)
- `.xerox-fade` — Gradient mask that simulates ink running out (CSS `mask-image` with linear gradient fading to transparent)
- `.scan-lines` — Horizontal line pattern via repeating-linear-gradient (1px lines every 3-4px, very low opacity)
- `.paper-texture` — Real scanned paper as background layer with `mix-blend-mode: multiply`
- Apply base grain overlay to `<body>` via a `::after` pseudo-element so it covers everything subtly

### 1C. Typography Revolution

**Keep existing fonts:**
- Printvetica → display headlines (stays as primary display)
- Departure Mono → reading text, navigation labels
- Geist Sans → body text, blog reading

**Add 1-2 new fonts for experimental display:**
- A blackletter/gothic web font for "future medieval" accent moments (e.g., UnifrakturMaguntia from Google Fonts, or a similar free blackletter). Use sparingly — section headers, pull quotes, the `[bkap]` brand mark alternate
- Consider a rough/hand-drawn display font for "naive design" moments (e.g., Caveat, Reenie Beanie, or a custom scanned handwriting font)

**"Pick & Mix" type treatment — CSS approach:**
- Create a `.type-ransom` utility class that uses `@keyframes` and `nth-child` selectors to:
  - Vary `font-family` per character (wrap letters in spans via JS component)
  - Apply slight random `rotate(-2deg to 3deg)` per letter
  - Vary `font-size` slightly (±10%)
  - Offset `translateY` by 1-3px randomly
- Build a `<RansomText>` React component that splits text into individual `<span>` elements with seeded random transforms (seeded so it's consistent across renders, not jittery)
- Use this only for hero titles, section headers, and navigation — NOT body text

**New text utility classes:**
- `.type-medieval` — Blackletter font-family + tight letter-spacing + slightly larger size
- `.type-xerox` — Departure Mono at reduced opacity (0.7) with slight blur (0.3px) to simulate low-ink printing
- `.type-stamp` — Uppercase, letter-spacing 0.15em, border treatment that looks like a rubber stamp
- `.display-hero` update — Add `text-shadow` with slight offset for "misregistration" print effect (like CMYK plates slightly misaligned)

### 1D. Layout System Updates

**Grid-breaking layouts:**
- Add CSS classes for elements that intentionally break the grid:
  - `.bleed-left` / `.bleed-right` — Elements that extend beyond container into margins
  - `.offset-up` / `.offset-down` — Vertical offsets that overlap adjacent sections (negative margins)
  - `.tilt-slight` — `transform: rotate(-1deg)` for that hand-placed feel
  - `.overlap-next` — Negative margin-bottom to overlap the following section

**Thick rule bands update:**
- Current 8px clean bands → Replace with textured bands:
  - Use `border-image` with a scanned ink/xerox texture
  - Or replace borders with thin `<div>` elements that have the paper-grain background
  - Add occasional "tear" effect using `clip-path` polygon for a ripped-paper edge

---

## Phase 2: Global Components

### 2A. Header / Navigation Redesign

**Current:** Clean horizontal nav with `[bkap]` brand, text links, social icons.

**New direction:**
- Background: transparent → `--color-bg` with subtle grain
- Brand mark `[bkap]` → Render in blackletter font OR the `<RansomText>` treatment with each letter from a different font
- Navigation links: Departure Mono, uppercase, wide letter-spacing
- Add a subtle scan-line effect across the header (repeating-linear-gradient)
- Hover state: Instead of clean underline, use a "stamped" highlight effect — `background-color` accent-red with slight rotation and rough edges via `clip-path` or SVG mask
- Active state: Red accent block behind text (032C-inspired)
- Mobile menu: Keep slide-in panel but darken it. Add xerox grain overlay. Navigation items get numbered labels in accent-red

### 2B. Footer Redesign

- Dark background (even darker than body: `#050505`)
- Large display type for contact email (Printvetica, full-width)
- Social links styled as a "directory listing" in Departure Mono
- Add scanned texture overlay
- Availability badge: Keep green accent but style as a blinking terminal cursor or "LIVE" indicator
- Add a torn/ripped paper edge at the top of the footer section

### 2C. Page Transitions

- Keep the existing fade-in but add:
  - A brief "scan-line sweep" effect — a white line that moves top-to-bottom quickly (150ms) before content appears
  - Content fades in with slight grain burst (grain opacity goes from 0.3 to 0.05)
  - Consider adding a very brief VHS-tracking-style glitch on transition (horizontal offset + color split for ~100ms)

---

## Phase 3: Homepage Redesign

**Concept:** The homepage should feel like the cover of an underground magazine.

### 3A. Hero Section

- **Background:** Full-viewport dark with heavy paper-crumple texture overlay
- **Video carousel:** Keep the 5 rotating videos but apply:
  - CSS `filter: grayscale(80%) contrast(1.2) brightness(0.8)` for a gritty look
  - `mix-blend-mode: luminosity` or `screen` against dark background
  - Reduced opacity (0.3-0.5) so video becomes atmospheric texture, not primary focus
  - Add grain overlay on top of video
- **Title "BRENNAN K.A. POLLOCK":**
  - Use `<RansomText>` component — each letter from a different font/weight/rotation
  - OR keep Printvetica but add CMYK misregistration text-shadow effect (red shadow offset 2px left, cyan shadow offset 2px right)
  - Scale: Keep massive (`display-hero-xl` class, 6rem-20rem clamp)
  - Add a `::after` pseudo-element with a red accent block behind a few letters (032C style)
- **Subtitle/tagline:** Add a brief descriptor in Departure Mono, xerox-faded treatment
  - e.g., `DESIGNER / DEVELOPER / MAKER` in stamped, slightly rotated text
- **Scroll indicator:** Replace any existing scroll CTA with a hand-drawn arrow or a pulsing red dot (032C-inspired)

### 3B. Below-the-fold Content

- **Featured Work preview:** 1-2 projects shown as magazine cover thumbnails with heavy texture treatment, overlapping the hero section slightly (`offset-up` class)
- **Latest Writing teaser:** 2-3 blog post titles in large Printvetica type, stacked vertically with generous spacing. Each title has a "page number" in red (like magazine TOC)
- **Stash preview:** Small grid of 3-4 recent stash items with xerox filter treatment
- **Section dividers:** Use ripped-paper edge `clip-path` or scanned texture strips instead of clean rule bands

---

## Phase 4: Blog Redesign

### 4A. Blog Listing Page

**Keep:** File-tree sidebar with category filtering (this is great and unique).

**Update sidebar:**
- Dark background (`--color-bg-surface`)
- Tree lines in `--color-fg-dim`
- Category icons: Replace clean bitmap icons with hand-drawn or xerox-scanned versions
- Active category: Red accent highlight (032C style)
- Checkbox styling: Custom checkboxes that look hand-drawn (rough borders, slight rotation)

**Update post list:**
- Dark card/row styling on `--color-bg-elevated`
- Post titles in larger Printvetica with slight grain effect
- Metadata (date, reading time) in Departure Mono, xerox-faded
- Add "issue number" styling to dates (like magazine issue numbers: `№ 2025.09`)
- Hover: Subtle grain burst + red accent line appears

### 4B. Individual Blog Post Page

**Reading experience stays clean** but with atmospheric treatment:
- Body text: Geist Sans or Departure Mono on dark background — ensure good contrast (`--color-fg` on `--color-bg`)
- Headers within post: Printvetica with slight offset/rotation
- Code blocks: Departure Mono with scan-line overlay, slightly different background
- Pull quotes: Large blackletter or Printvetica, red accent, overlapping margins (`bleed-left`)
- Images in posts: Apply subtle grain overlay + slight desaturation
- Post header: Magazine cover treatment — large title, author "byline" in stamped style, reading time as "PAGES: X"

---

## Phase 5: Stash Page Redesign

**Keep:** Masonry grid, filtering, infinite scroll, card variants.

### 5A. Toolbar Update
- Dark background with scan-line texture
- Filter chips: Red border when active (032C-inspired), rough/hand-drawn border style
- Item count: Departure Mono in xerox-faded treatment
- Transition existing blue accent → red accent

### 5B. Card Treatment
- All cards get subtle paper-grain background
- Image cards: Apply `filter: grayscale(30%) contrast(1.1)` + grain overlay on hover
- Quote cards: Blackletter or large Printvetica for the quote text, stamped author name
- Link cards: Terminal/directory-listing style in Departure Mono
- Video cards: Desaturated thumbnail with grain, red play button overlay
- Hover state: Instead of clean overlay, show a "xerox scan" effect — content appears to be freshly photocopied (brief flash of higher grain + slight brightness)

---

## Phase 6: Work Page (New Build)

**Concept:** Magazine spread format — each project is a full editorial feature.

### 6A. Work Landing Page
- Full-screen opening with large Printvetica title "WORK" or "SELECTED WORKS" in ransom-note treatment
- Project list as magazine table of contents:
  - Large issue-style numbers (01, 02, 03...) in red
  - Project title in Printvetica
  - Brief descriptor in Departure Mono
  - Year in stamped style
- Click/scroll to navigate to individual project spreads

### 6B. Individual Project Spread
Each project rendered as a magazine feature spread:
- **Hero image:** Full-bleed with heavy texture treatment (grayscale + grain + low-ink fade at edges)
- **Project title:** Massive Printvetica with CMYK misregistration effect
- **Role/collaborators:** Stamped, rotated text in margin area
- **Description:** Clean readable text (Geist Sans) but with editorial layout — narrow column width, generous leading, pull quotes that break into margins
- **Project images:** Treated as if they were xeroxed — grayscale, grain, slightly cropped/rotated as if hand-placed in a zine
- **Tags:** Styled as "stamps" with rough borders and slight rotation
- **Navigation between projects:** "NEXT →" / "← PREV" in large type at bottom, magazine page-turn feel

### 6C. Data Structure
Use existing `projects.js` but extend with:
- `heroImage` — Full-bleed hero image path
- `galleryImages` — Array of project images
- `pullQuote` — Featured quote from the project
- `year` — Project year
- `url` — Live project URL (if applicable)

---

## Phase 7: About Page (New Build)

**Concept:** Magazine profile piece — like a feature interview in The Face.

### 7A. Layout
- **Opening:** Full-bleed portrait/photo with heavy grain treatment, name overlaid in massive Printvetica
- **Bio section:** Two-column editorial layout:
  - Left: Narrow column with key facts/stats in stamped Departure Mono (location, focus areas, years active)
  - Right: Main bio text in clean Geist Sans, but with pull quotes in blackletter breaking into the left column
- **Skills/Tools:** Not a boring grid of logos. Instead, a "directory listing" in Departure Mono that looks like a terminal printout or a xeroxed reference sheet
- **Timeline/Experience:** Vertical timeline styled as a film strip or zine page sequence
  - Each entry has a "torn paper" container
  - Dates in red accent
  - Descriptions in mixed type (headers in Printvetica, body in Geist Sans)

### 7B. Content Source
Use existing `aboutMe.md` content, parsed and rendered with the new editorial treatment.

---

## Phase 8: Micro-interactions & Animation Polish

### 8A. Cursor Effects (Optional — consider performance)
- Custom cursor that leaves a subtle "ink trail" on dark background
- Or: cursor changes near interactive elements (red dot on hover over links)

### 8B. Text Effects
- **Glitch on hover:** Links/nav items get brief horizontal offset + color split (2-3 frame CSS animation)
- **Dissolve effect:** Elements that scroll out of view fade with a "low-ink dissolve" (opacity + slight blur + grain increase)
- **Typewriter reveal:** Blog post titles type themselves in with a monospace cursor blink

### 8C. Scroll-triggered Effects
- Grain intensity subtly varies as you scroll (parallax grain layers at different speeds)
- Section entries: Content slides in with slight rotation correction (starts at -1deg, settles to 0)
- Image reveals: Scan-line sweep effect before image becomes visible

### 8D. Loading States
- Replace standard loading indicators with a "photocopier warming up" animation
- Stash infinite scroll: "FEEDING PAPER..." in Departure Mono with blinking cursor

---

## Phase 9: Asset Creation & Preparation

### 9A. Texture Assets (Required before implementation)
Create/source and place in `public/textures/`:
1. `paper-grain-light.png` (300x300, tileable, subtle)
2. `paper-grain-heavy.png` (300x300, tileable, pronounced)
3. `xerox-noise.png` (400x400, tileable, photocopy grain)
4. `scan-artifact.png` (full-width strip, horizontal scan marks)
5. `paper-crumple.webp` (1920x1080, hero background overlay)
6. `torn-edge-top.svg` (SVG path for ripped paper edge, used at section breaks)
7. `torn-edge-bottom.svg` (mirror of above)
8. `ink-bleed.png` (edge effect for images, 200x200 corner pieces)

For the initial implementation, we'll generate these procedurally with CSS/SVG and Canvas, then optionally replace with real scanned textures later for maximum authenticity.

### 9B. Font Files
- Source a free blackletter web font (UnifrakturMaguntia, or similar)
- Download and place in `public/fonts/`
- Register in `layout.js` with `next/font/local`

---

## Implementation Order

1. **Phase 1** (Foundation) — Do this first. Everything else depends on the visual system.
2. **Phase 2** (Global Components) — Header, footer, transitions affect every page.
3. **Phase 3** (Homepage) — The first impression.
4. **Phase 4** (Blog) — Largest existing content section.
5. **Phase 5** (Stash) — Relatively quick update since structure is good.
6. **Phase 6** (Work) — New build, needs most new code.
7. **Phase 7** (About) — New build, simpler than Work.
8. **Phase 8** (Polish) — Micro-interactions and animation refinement.
9. **Phase 9** (Assets) — Can happen in parallel with any phase; start with CSS/SVG procedural textures and upgrade to real scans later.

---

## Files to Create/Modify

### New Files:
- `src/components/ui/RansomText.jsx` — Pick & mix typography component
- `src/components/ui/GrainOverlay.jsx` — Global grain texture overlay
- `src/components/ui/TornEdge.jsx` — Ripped paper divider component
- `src/components/ui/ScanReveal.jsx` — Scroll-triggered scan-line reveal animation
- `src/components/ui/StampText.jsx` — Rubber stamp styled text component
- `src/components/work/ProjectSpread.jsx` — Magazine spread layout for projects
- `src/components/work/ProjectTOC.jsx` — Table of contents for work page
- `src/components/about/ProfileHero.jsx` — About page hero
- `src/components/about/Timeline.jsx` — Experience timeline
- `src/components/about/DirectoryListing.jsx` — Skills/tools display
- `src/app/work/page.js` — Rebuild from placeholder
- `src/app/work/[slug]/page.js` — Individual project pages
- `src/app/about/page.js` — Rebuild from placeholder
- `public/textures/` — Directory for texture assets (generated via CSS/Canvas initially)
- `public/fonts/` — Blackletter font files

### Major Modifications:
- `src/app/globals.css` — Complete color palette swap, new utility classes, texture system, animation keyframes
- `src/app/layout.js` — New font registration, grain overlay wrapper, dark mode base
- `src/app/page.js` — Homepage redesign
- `src/components/Header.jsx` — Dark theme, new hover states, brand mark treatment
- `src/components/Footer.jsx` (or equivalent) — Dark editorial footer
- `src/components/MobileMenu.jsx` — Dark grain treatment
- `src/app/blog/page.js` — Dark theme application
- `src/components/BlogSidebar.jsx` — Dark theme, hand-drawn checkboxes
- `src/components/BlogPostList.jsx` — Magazine-style post listing
- `src/app/stash/page.js` — Dark theme
- `src/components/StashToolbar.jsx` — Red accent filters
- `src/components/StashCard.jsx` — Textured card treatments
- `src/components/StashMasonry.jsx` — Updated animation
- `src/data/projects.js` — Extend data structure for magazine spreads

### Untouched:
- `src/app/admin/**` — Admin panel stays as-is
- `src/app/api/**` — API routes unchanged
- `src/lib/appwrite/**` — CMS integration unchanged
- `src/data/blogPosts.js` — Content unchanged
- `src/data/stashItems.js` — Content unchanged
