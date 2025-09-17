"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Design System Architecture",
    role: "Lead Developer",
    description: "Built a comprehensive design system serving 50+ applications",
    image: "/vercel.svg",
    tags: ["React", "TypeScript", "Storybook"],
    color: "accent-primary",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    role: "Full Stack Developer",
    description: "Next-gen shopping experience with AI recommendations",
    image: "/next.svg",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    color: "accent-warm",
  },
  {
    id: 3,
    title: "Creative Portfolio",
    role: "Designer & Developer",
    description: "Award-winning portfolio for digital artist collective",
    image: "/globe.svg",
    tags: ["Three.js", "GSAP", "WebGL"],
    color: "accent-success",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    role: "UI/UX Developer",
    description: "Reimagined financial management for millennials",
    image: "/window.svg",
    tags: ["React Native", "Firebase", "Motion"],
    color: "accent-primary",
  },
  {
    id: 5,
    title: "AI Content Platform",
    role: "Technical Lead",
    description: "Revolutionary platform for AI-powered content creation",
    image: "/file.svg",
    tags: ["Python", "TensorFlow", "Next.js"],
    color: "accent-warm",
  },
];

export default function FeaturedProjects() {
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = projectsRef.current?.querySelectorAll(".project-card");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-32">
      <div className="container">
        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-[var(--letter-spacing-tight)]">
            Selected Work
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl">
            A curated collection of projects showcasing the intersection of
            design and technology
          </p>
        </div>

        {/* Projects grid - asymmetrical masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className={`project-card group block opacity-0 translate-y-8 transition-all duration-700 ${
                index % 3 === 0 ? "lg:col-span-2" : ""
              } ${index % 5 === 0 ? "lg:row-span-2" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <article className="relative h-full overflow-hidden bg-surface hover:bg-border/20 transition-all duration-[var(--transition-slow)] cursor-pointer">
                {/* Image container */}
                <div
                  className={`relative overflow-hidden ${
                    index % 5 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-[var(--transition-base)]" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[var(--transition-slow)]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-8 z-20">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[var(--transition-base)]">
                      <p
                        className={`text-sm font-medium text-${project.color} mb-2 uppercase tracking-[var(--letter-spacing-wider)]`}
                      >
                        {project.role}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-foreground-muted mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-base)] delay-100">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--transition-base)] delay-150">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground-muted rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[var(--transition-base)] transform translate-x-2 group-hover:translate-x-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View all projects */}
        <div className="mt-16 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent-primary transition-colors duration-[var(--transition-fast)] group"
          >
            <span className="text-lg">View All Projects</span>
            <svg
              className="w-5 h-5 transition-transform duration-[var(--transition-base)] group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .delay-150 {
          transition-delay: 150ms;
        }
      `}</style>
    </section>
  );
}
