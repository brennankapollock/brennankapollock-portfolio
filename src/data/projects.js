export const projects = [
  {
    id: "sun-rot-studios",
    title: "Sun Rot Studios",
    slug: "sun-rot-studios",
    tagline: "Creative studio and collective",
    description: "Building a creative studio focused on experimental projects at the intersection of art, technology, and philosophy.",
    imageUrl: "/placeholder-work-1.jpg",
    year: "2025",
    role: "Founder & Creative Director",
    categories: ["studio", "creative"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    status: "active",
    featured: true
  },
  {
    id: "portfolio-redesign",
    title: "Personal Portfolio v3",
    slug: "portfolio-redesign",
    tagline: "Brutalist portfolio site",
    description: "Minimal portfolio inspired by museum design systems, Stedelijk Museum, and brutalist web design principles.",
    imageUrl: "/placeholder-work-2.jpg",
    year: "2025",
    role: "Design & Development",
    categories: ["web", "design"],
    tech: ["Next.js 15", "React 19", "Tailwind CSS v4"],
    status: "active",
    featured: true
  },
  {
    id: "blog-system",
    title: "Editorial Blog System",
    slug: "blog-system",
    tagline: "File-tree blog with filters",
    description: "Developer-first blog system with file-tree navigation, inspired by Stripe Dev Blog and technical documentation sites.",
    imageUrl: "/placeholder-work-3.jpg",
    year: "2025",
    role: "Design & Development",
    categories: ["web", "code"],
    tech: ["React", "Next.js", "CSS Grid"],
    status: "active",
    featured: true
  },
  {
    id: "asylum-work",
    title: "Legal Asylum Translation",
    slug: "asylum-work",
    tagline: "Justice through language",
    description: "Six years translating desperation into legal documentation. Helping asylum seekers navigate immigration systems.",
    imageUrl: "/placeholder-work-1.jpg",
    year: "2018-2024",
    role: "Translator & Advocate",
    categories: ["justice", "language"],
    tech: ["Legal research", "Translation", "Case management"],
    status: "completed",
    featured: false
  },
  {
    id: "commune-organizing",
    title: "Commune & Community Work",
    slug: "commune-organizing",
    tagline: "Building alternative systems",
    description: "Organizing and participating in intentional communities focused on mutual aid, shared resources, and collective liberation.",
    imageUrl: "/placeholder-work-2.jpg",
    year: "2020-2023",
    role: "Organizer & Participant",
    categories: ["community", "justice"],
    tech: ["Organizing", "Facilitation", "Resource sharing"],
    status: "ongoing",
    featured: false
  },
  {
    id: "undraped-in-clover",
    title: "Undraped in Clover",
    slug: "undraped-in-clover",
    tagline: "Writing on embodiment & aliveness",
    description: "Essays and reflections on embodied spirituality, philosophy, and the practice of being fully alive.",
    imageUrl: "/placeholder-work-3.jpg",
    year: "2024-present",
    role: "Writer",
    categories: ["writing", "philosophy"],
    tech: ["Writing", "Publishing", "Essays"],
    status: "active",
    featured: true
  }
];

// Helper functions
export function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

export function getProjectsByCategory(category) {
  if (!category) return projects;
  return projects.filter(project => project.categories.includes(category));
}

export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}

export function getAllCategories() {
  const categories = new Set();
  projects.forEach(project => {
    project.categories.forEach(cat => categories.add(cat));
  });
  return Array.from(categories);
}