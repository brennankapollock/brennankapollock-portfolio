"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import StampText from "@/components/ui/StampText";
import RansomText from "@/components/ui/RansomText";
import ScanReveal from "@/components/ui/ScanReveal";

export default function WorkPage() {
  return (
    <div className="work-page">
      {/* Hero */}
      <div className="work-hero">
        <h1
          className="work-hero-title type-misprint"
          data-text="SELECTED WORKS"
        >
          <RansomText text="SELECTED WORKS" seed={7} />
        </h1>
        <p className="work-hero-sub type-xerox">
          Projects spanning design, engineering, community, and art
        </p>
      </div>

      {/* Table of contents — magazine style */}
      <div className="work-toc">
        {projects.map((project, idx) => (
          <ScanReveal key={project.id} delay={idx * 100}>
            <Link href={`/work/${project.slug}`} className="work-toc-item">
              <div className="work-toc-number">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="work-toc-content">
                <h2 className="work-toc-title">{project.title}</h2>
                <p className="work-toc-tagline">{project.tagline}</p>
              </div>
              <div className="work-toc-meta">
                <StampText
                  color={
                    project.status === "active"
                      ? "var(--color-accent-green)"
                      : project.status === "completed"
                        ? "var(--color-fg-muted)"
                        : "var(--color-accent-yellow)"
                  }
                  rotate={0}
                >
                  {project.year}
                </StampText>
              </div>
              <div className="work-toc-arrow">&rarr;</div>
            </Link>
          </ScanReveal>
        ))}
      </div>
    </div>
  );
}
