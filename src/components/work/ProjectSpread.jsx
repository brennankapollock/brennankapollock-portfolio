"use client";

import Link from "next/link";
import RansomText from "@/components/ui/RansomText";
import StampText from "@/components/ui/StampText";
import ScanReveal from "@/components/ui/ScanReveal";

export default function ProjectSpread({ project, prevProject, nextProject }) {
  return (
    <article className="project-spread">
      {/* Hero section */}
      <div className="project-hero">
        <div className="project-hero-image scan-lines">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="project-hero-img"
          />
          <div className="project-hero-overlay" />
        </div>
        <div className="project-hero-content">
          <h1
            className="project-hero-title type-misprint"
            data-text={project.title.toUpperCase()}
          >
            <RansomText
              text={project.title.toUpperCase()}
              seed={project.id.length}
            />
          </h1>
        </div>
      </div>

      {/* Project details */}
      <div className="project-body container-site">
        {/* Meta sidebar + description */}
        <div className="project-layout">
          <aside className="project-meta">
            <ScanReveal delay={200}>
              <div className="project-meta-block">
                <span className="project-meta-label">Role</span>
                <span className="project-meta-value">{project.role}</span>
              </div>
            </ScanReveal>
            <ScanReveal delay={300}>
              <div className="project-meta-block">
                <span className="project-meta-label">Year</span>
                <span className="project-meta-value">{project.year}</span>
              </div>
            </ScanReveal>
            <ScanReveal delay={400}>
              <div className="project-meta-block">
                <span className="project-meta-label">Status</span>
                <StampText
                  color={
                    project.status === "active"
                      ? "var(--color-accent-green)"
                      : "var(--color-fg-muted)"
                  }
                  rotate={-1}
                >
                  {project.status}
                </StampText>
              </div>
            </ScanReveal>
            <ScanReveal delay={500}>
              <div className="project-meta-block">
                <span className="project-meta-label">Stack</span>
                <div className="project-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScanReveal>
          </aside>

          <div className="project-description">
            <ScanReveal delay={200}>
              <p className="project-description-text">
                {project.description}
              </p>
            </ScanReveal>
          </div>
        </div>
      </div>

      {/* Navigation between projects */}
      <nav className="project-nav container-site" aria-label="Project navigation">
        <div className="project-nav-inner">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="project-nav-link project-nav-prev"
            >
              <span className="project-nav-direction">&larr; PREV</span>
              <span className="project-nav-title">{prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="project-nav-link project-nav-next"
            >
              <span className="project-nav-direction">NEXT &rarr;</span>
              <span className="project-nav-title">{nextProject.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </article>
  );
}
