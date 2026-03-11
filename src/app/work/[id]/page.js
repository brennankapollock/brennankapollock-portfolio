import { projects, getProjectBySlug } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectSpread from "@/components/work/ProjectSpread";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.slug }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectBySlug(id);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }) {
  const { id } = await params;
  const project = getProjectBySlug(id);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === id);
  const prevProject = idx > 0 ? projects[idx - 1] : null;
  const nextProject = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <ProjectSpread
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
