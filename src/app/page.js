import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { getFeaturedProjects } from "@/data/projects";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 4);
  const latestPost = blogPosts[0];

  return (
    <div className="homepage-editorial">
      {/* Masthead */}
      <div className="homepage-masthead">
        <h1 className="homepage-title">
          Brennan
          <br />
          K.A. Pollock
        </h1>
        <p className="homepage-subtitle">
          Engineer &middot; Artist &middot; Venice Beach, CA
        </p>
      </div>

      {/* Featured projects grid */}
      <div className="homepage-grid">
        <div className="homepage-section-label">Selected Work</div>
        <div className="homepage-featured-grid">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="homepage-featured-item"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={400}
                height={300}
                className="homepage-featured-image"
              />
              <div className="homepage-featured-date">
                {project.year} &middot; {project.status}
              </div>
              <h2 className="homepage-featured-title">{project.title}</h2>
              <p className="homepage-featured-excerpt">{project.tagline}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest writing */}
      {latestPost && (
        <div className="homepage-writing">
          <h2 className="homepage-writing-headline">{latestPost.title}</h2>
          <p className="homepage-writing-excerpt">{latestPost.excerpt}</p>
          <Link href="/blog" className="homepage-writing-link">
            Read all writing &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
