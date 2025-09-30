import Link from 'next/link';
import { projects } from '@/data/projects';

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className="work-layout">
      <div className="work-hero">
        <h1 className="museum-main-title">SELECTED WORK</h1>
        <p className="museum-tagline">
          PROJECTS, WRITING, & OTHER ENDEAVORS
        </p>
      </div>

      <div className="museum-separator"></div>

      <div className="work-grid-container">
        <div className="work-grid">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="work-card"
            >
              <div className="work-card-image">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="work-card-img"
                  loading="lazy"
                />
                <div className="work-card-overlay">
                  <div className="work-card-overlay-content">
                    <h2 className="work-card-title">{project.title}</h2>
                    <p className="work-card-tagline">{project.tagline}</p>
                    <div className="work-card-meta">
                      <span className="work-card-year">{project.year}</span>
                      <span className="work-card-role">{project.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}