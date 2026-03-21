import Link from "next/link";

export default function ProjectSpread({ project, prevProject, nextProject }) {
  return (
    <article className="project-spread">
      {/* Header */}
      <div className="project-header">
        <h1 className="project-title">{project.title}</h1>
        <p className="project-tagline">{project.tagline}</p>
      </div>

      {/* Content */}
      <div className="project-content">
        <aside className="project-meta">
          <div className="project-meta-block">
            <span className="project-meta-label">Role</span>
            <span className="project-meta-value">{project.role}</span>
          </div>
          <div className="project-meta-block">
            <span className="project-meta-label">Year</span>
            <span className="project-meta-value">{project.year}</span>
          </div>
          <div className="project-meta-block">
            <span className="project-meta-label">Status</span>
            <span className="project-meta-value">{project.status}</span>
          </div>
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
        </aside>

        <div className="project-description">
          <p className="project-description-text">{project.description}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="project-nav" aria-label="Project navigation">
        {prevProject ? (
          <Link href={`/work/${prevProject.slug}`} className="project-nav-link">
            <span className="project-nav-direction">&larr; Previous</span>
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
            <span className="project-nav-direction">Next &rarr;</span>
            <span className="project-nav-title">{nextProject.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
