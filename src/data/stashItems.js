// Stash item types: 'image', 'link', 'text', 'video', 'quote'
// Categories mirror the aesthetic interests

export const stashCategories = {
  music: {
    name: "music",
    displayName: "Music",
    subcategories: ["albums", "artists", "performances"],
  },
  books: {
    name: "books",
    displayName: "Books",
    subcategories: ["nonfiction", "fiction", "essays"],
  },
  films: {
    name: "films",
    displayName: "Films",
    subcategories: ["title sequences", "directors", "scenes"],
  },
  art: {
    name: "art",
    displayName: "Art",
    subcategories: ["painting", "sculpture", "photography", "installation"],
  },
  quotes: {
    name: "quotes",
    displayName: "Quotes",
    subcategories: ["design", "philosophy", "culture"],
  },
};

export const stashItems = [
  // New items to support Music, Books, and Films categories
  {
    id: "miles-davis-kind-of-blue",
    type: "link",
    title: "Miles Davis — Kind of Blue (1959)",
    url: "https://en.wikipedia.org/wiki/Kind_of_Blue",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop",
    description:
      "Modal jazz landmark. Sparse structure, deep atmosphere—timeless minimal mastery.",
    categories: ["music"],
    subcategory: "albums",
    date: "2025.9.30",
    source: "wikipedia.org",
  },
  {
    id: "radiohead-in-rainbows",
    type: "link",
    title: "Radiohead — In Rainbows (2007)",
    url: "https://en.wikipedia.org/wiki/In_Rainbows",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
    description:
      "Textural, intimate, meticulously crafted. A masterclass in modern album design and pacing.",
    categories: ["music"],
    subcategory: "albums",
    date: "2025.9.29",
    source: "wikipedia.org",
  },
  {
    id: "blade-runner-1982-title-sequence",
    type: "link",
    title: "Blade Runner (1982) — Title Sequence",
    url: "https://www.artofthetitle.com/title/blade-runner/",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop",
    description:
      "Monolithic typography, industrial atmosphere—proto-brutalist cinematic identity.",
    categories: ["films"],
    subcategory: "title sequences",
    date: "2025.9.28",
    source: "artofthetitle.com",
  },
  {
    id: "andrei-rublev-1966",
    type: "link",
    title: "Andrei Rublev (1966) — Tarkovsky",
    url: "https://en.wikipedia.org/wiki/Andrei_Rublev_(film)",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop",
    description:
      "Ascetic, spiritual, and monumental imagery. Slow cinema as visual architecture.",
    categories: ["films", "art"],
    subcategory: "directors",
    date: "2025.9.27",
    source: "wikipedia.org",
  },
  {
    id: "design-of-everyday-things",
    type: "link",
    title: "The Design of Everyday Things — Don Norman",
    url: "https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop",
    description:
      "UX fundamentals that outlast trends. Affordances and constraints with clarity.",
    categories: ["books"],
    subcategory: "nonfiction",
    date: "2025.9.26",
    source: "wikipedia.org",
  },
  {
    id: "house-of-leaves",
    type: "link",
    title: "House of Leaves — Mark Z. Danielewski",
    url: "https://en.wikipedia.org/wiki/House_of_Leaves",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=600&fit=crop",
    description:
      "Typographic labyrinth. Brutalist book-as-object with experimental narrative.",
    categories: ["books", "art"],
    subcategory: "fiction",
    date: "2025.9.25",
    source: "wikipedia.org",
  },
  {
    id: "stedelijk-museum",
    type: "link",
    title: "Stedelijk Museum Amsterdam",
    url: "https://www.stedelijk.nl",
    imageUrl:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=600&fit=crop",
    description:
      "Museum website with bold typography and asymmetric layouts. Perfect example of brutalist web design done right.",
    categories: ["design", "editorial"],
    subcategory: "brutalism",
    date: "2025.9.20",
    source: "stedelijk.nl",
  },
  {
    id: "stripe-dev-blog",
    type: "link",
    title: "Stripe Developer Blog",
    url: "https://stripe.com/blog/engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop",
    description:
      "Technical writing with exceptional information design. Clean, organized, developer-first.",
    categories: ["design", "code"],
    subcategory: "interface",
    date: "2025.9.19",
    source: "stripe.com",
  },
  {
    id: "cosmos-gallery",
    type: "link",
    title: "Cosmos: Save anything",
    url: "https://cosmos.so",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop",
    description:
      "Beautiful masonry gallery for collecting visual inspiration. Minimal UI, maximum content.",
    categories: ["design", "inspiration"],
    subcategory: "collections",
    date: "2025.9.18",
    source: "cosmos.so",
  },
  {
    id: "arena-platform",
    type: "link",
    title: "Are.na: Visual Organization",
    url: "https://are.na",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    description:
      "Platform for collecting and connecting ideas. Beautiful grid system and minimal aesthetic.",
    categories: ["design", "inspiration"],
    subcategory: "collections",
    date: "2025.9.17",
    source: "are.na",
  },
  {
    id: "brutalist-websites",
    type: "link",
    title: "Brutalist Websites",
    url: "https://brutalistwebsites.com",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    description:
      "Curated collection of brutalist web design. Raw, honest, structural beauty.",
    categories: ["design", "inspiration"],
    subcategory: "brutalism",
    date: "2025.9.16",
    source: "brutalistwebsites.com",
  },
  {
    id: "quote-paul-rand",
    type: "quote",
    text: "Design is the silent ambassador of your brand.",
    author: "Paul Rand",
    categories: ["quotes", "art"],
    subcategory: "design",
    date: "2025.9.15",
  },
  {
    id: "swiss-style-typography",
    type: "image",
    title: "Swiss International Style",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    description:
      "Examples of Swiss typography: grid systems, sans-serif typefaces, asymmetric layouts.",
    categories: ["design", "art"],
    subcategory: "typography",
    date: "2025.9.14",
    source: "Swiss Design Archive",
  },
  {
    id: "css-grid-masonry",
    type: "link",
    title: "CSS Grid Masonry Layout",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout",
    description:
      "MDN documentation on masonry layouts with CSS Grid. The future of layout.",
    categories: ["code"],
    subcategory: "css",
    date: "2025.9.13",
    source: "MDN Web Docs",
  },
  {
    id: "whitman-leaves-grass",
    type: "quote",
    text: "I am large, I contain multitudes.",
    author: "Walt Whitman, Leaves of Grass",
    categories: ["quotes", "books"],
    subcategory: "poetry",
    date: "2025.9.12",
  },
  {
    id: "framer-motion",
    type: "link",
    title: "Framer Motion: Animation Library",
    url: "https://www.framer.com/motion/",
    description:
      "Production-ready motion library for React. Smooth, performant animations.",
    categories: ["code"],
    subcategory: "animation",
    date: "2025.9.11",
    source: "framer.com",
  },
  {
    id: "moma-collection",
    type: "link",
    title: "MoMA Collection Online",
    url: "https://www.moma.org/collection/",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop",
    description:
      "Museum of Modern Art's entire collection available online. Exceptional art database.",
    categories: ["art", "inspiration"],
    subcategory: "museums",
    date: "2025.9.10",
    source: "moma.org",
  },
  {
    id: "bauhaus-movement",
    type: "text",
    title: "The Bauhaus Movement",
    text: "Form follows function. The Bauhaus school revolutionized design by merging art, craft, and technology. Their systematic approach to typography, color theory, and spatial composition continues to influence modern design.",
    categories: ["design", "art"],
    subcategory: "editorial",
    date: "2025.9.9",
  },
  {
    id: "next-image-optimization",
    type: "link",
    title: "Next.js Image Optimization",
    url: "https://nextjs.org/docs/basic-features/image-optimization",
    description:
      "Automatic image optimization with next/image. Lazy loading, responsive images, WebP conversion.",
    categories: ["code"],
    subcategory: "react",
    date: "2025.9.8",
    source: "Next.js Docs",
  },
  {
    id: "quote-dieter-rams",
    type: "quote",
    text: "Less, but better.",
    author: "Dieter Rams",
    categories: ["quotes", "art"],
    subcategory: "design",
    date: "2025.9.7",
  },
  {
    id: "tachyons-css",
    type: "link",
    title: "Tachyons: Functional CSS",
    url: "https://tachyons.io",
    description:
      "Functional CSS toolkit. Fast, responsive, readable. Minimalist approach to styling.",
    categories: ["code", "design"],
    subcategory: "css",
    date: "2025.9.6",
    source: "tachyons.io",
  },
  {
    id: "gordon-matta-clark",
    type: "image",
    title: "Gordon Matta-Clark: Building Cuts",
    imageUrl:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=600&fit=crop",
    description:
      "Architectural artist who cut through buildings. Brutalist interventions revealing structure.",
    categories: ["art"],
    subcategory: "installation",
    date: "2025.9.5",
    source: "Art Archive",
  },
  {
    id: "modular-scale",
    type: "link",
    title: "Modular Scale Tool",
    url: "https://www.modularscale.com",
    description:
      "Calculate typographic scales based on ratios. Perfect for systematic design.",
    categories: ["design"],
    subcategory: "typography",
    date: "2025.9.4",
    source: "modularscale.com",
  },
  {
    id: "quote-merleau-ponty",
    type: "quote",
    text: "The body is our general medium for having a world.",
    author: "Maurice Merleau-Ponty",
    categories: ["quotes"],
    subcategory: "philosophy",
    date: "2025.9.3",
  },
  {
    id: "intersection-observer",
    type: "link",
    title: "Intersection Observer API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
    description:
      "Web API for detecting element visibility. Essential for infinite scroll and lazy loading.",
    categories: ["code"],
    subcategory: "tools",
    date: "2025.9.2",
    source: "MDN Web Docs",
  },
  {
    id: "japanese-typography",
    type: "image",
    title: "Japanese Typography Examples",
    imageUrl:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=600&fit=crop",
    description:
      "Vertical and horizontal typesetting. Grid systems. Balance between tradition and modernism.",
    categories: ["design", "culture"],
    subcategory: "typography",
    date: "2025.9.1",
    source: "Type Archive",
  },
];

// Helper functions
export function getItemsByCategory(categoryName) {
  if (!categoryName) return stashItems;
  return stashItems.filter((item) => item.categories.includes(categoryName));
}

export function getItemsByType(typeName) {
  if (!typeName) return stashItems;
  return stashItems.filter((item) => item.type === typeName);
}

export function getItemsByFilters(categories = [], types = []) {
  let filtered = stashItems;

  if (categories.length > 0) {
    filtered = filtered.filter((item) =>
      item.categories.some((cat) => categories.includes(cat)),
    );
  }

  if (types.length > 0) {
    filtered = filtered.filter((item) => types.includes(item.type));
  }

  return filtered;
}

export function getAllTypes() {
  const types = new Set();
  stashItems.forEach((item) => types.add(item.type));
  return Array.from(types);
}

export function getItemById(id) {
  return stashItems.find((item) => item.id === id);
}

// New utility: case-insensitive contains
function containsCI(haystack = "", needle = "") {
  try {
    return haystack.toLowerCase().includes(needle.toLowerCase());
  } catch {
    return false;
  }
}

// Parse dates like "2025.9.20" safely; fallback to epoch 0 if invalid
export function parseStashDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return new Date(0);
  const parts = dateStr.split(".");
  if (parts.length < 3) return new Date(0);
  const [y, m, d] = parts.map((p) => parseInt(p, 10));
  if (!y || !m || !d) return new Date(0);
  return new Date(y, m - 1, d);
}

// Filter items by categories, types, and free-text query `q`.
// - categories: multi-select OR within the facet
//   Special alias: if categories includes 'quotes', also match items with type === 'quote'.
// - types: multi-select OR within the facet
// - Across facets the logic is AND (must satisfy both category and type when both are set)
// - q matches title, description, and source fields
export function filterStashItems({ categories = [], types = [], q = "" } = {}) {
  const selectedHasQuotes = categories.includes("quotes");
  const normalizedCategories = new Set(categories.filter(Boolean));
  const normalizedTypes = new Set(types.filter(Boolean));

  return stashItems.filter((item) => {
    // Category facet
    let catPass = true;
    if (normalizedCategories.size > 0) {
      const itemCats = Array.isArray(item.categories) ? item.categories : [];
      const matchesDirect = itemCats.some((c) => normalizedCategories.has(c));
      const matchesQuotesAlias = selectedHasQuotes && item.type === "quote";
      catPass = matchesDirect || matchesQuotesAlias;
    }

    // Type facet
    let typePass = true;
    if (normalizedTypes.size > 0) {
      typePass = normalizedTypes.has(item.type);
    }

    // Text query facet
    let qPass = true;
    if (q && q.trim().length > 0) {
      const t = item.title || "";
      const d = item.description || item.text || "";
      const s = item.source || "";
      const n = q.trim();
      qPass = containsCI(t, n) || containsCI(d, n) || containsCI(s, n);
    }

    return catPass && typePass && qPass;
  });
}

// Sort items by one of: 'newest' (default), 'oldest', 'title', 'type'
export function sortStashItems(items, sort = "newest") {
  const arr = [...items];
  switch (sort) {
    case "oldest":
      return arr.sort(
        (a, b) => +parseStashDate(a.date) - +parseStashDate(b.date),
      );
    case "title":
      return arr.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", undefined, {
          sensitivity: "base",
        }),
      );
    case "type":
      return arr.sort((a, b) =>
        (a.type || "").localeCompare(b.type || "", undefined, {
          sensitivity: "base",
        }),
      );
    case "newest":
    default:
      return arr.sort(
        (a, b) => +parseStashDate(b.date) - +parseStashDate(a.date),
      );
  }
}

// Convenience helper to get filtered and sorted set in one call
export function queryStash({
  categories = [],
  types = [],
  q = "",
  sort = "newest",
} = {}) {
  const filtered = filterStashItems({ categories, types, q });
  return sortStashItems(filtered, sort);
}
