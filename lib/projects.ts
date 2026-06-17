import { prisma } from "@/lib/prisma";
import type { Project, ProjectTag } from "@/content/projects";

function mapProject(project: {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  content: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
}): Project {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    tags: project.tags as ProjectTag[],
    image: project.image,
    content: project.content,
    techStack: project.techStack,
    github: project.github ?? undefined,
    demo: project.demo ?? undefined,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return projects.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const project = await prisma.project.findUnique({ where: { slug } });
  return project ? mapProject(project) : undefined;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await prisma.project.findMany({
    select: { slug: true },
    orderBy: { sortOrder: "asc" },
  });
  return projects.map((p) => p.slug);
}

export async function getAllProjectsAdmin() {
  return prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getProjectBySlugAdmin(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
