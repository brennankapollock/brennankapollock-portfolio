import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function WorkPage() {
  return (
    <div className="work-page">
      {/* Header */}
      <div className="work-header">
        <h1 className="work-title">Work</h1>
        <p className="work-description">
          Projects spanning design, engineering, community, and art
        </p>
      </div>

      {/* Grid */}
      <div className="work-grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="work-grid-item"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={300}
              className="work-item-image"
            />
            <div className="work-item-meta">
              {project.year} &middot; {project.role}
            </div>
            <h2 className="work-item-title">{project.title}</h2>
            <p className="work-item-tagline">{project.tagline}</p>
            <div className="work-item-tags">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="work-item-tag">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
