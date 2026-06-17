"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { slugify } from "@/lib/projects";
import type { ProjectTag } from "@/content/projects";

const VALID_TAGS: ProjectTag[] = ["Robotics", "Mechanical", "Software"];

function parseList(raw: string): string[] {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const tags = formData
    .getAll("tags")
    .map((t) => String(t).trim())
    .filter((t): t is ProjectTag => VALID_TAGS.includes(t as ProjectTag));
  const techStack = parseList(String(formData.get("techStack") ?? ""));
  const github = String(formData.get("github") ?? "").trim() || null;
  const demo = String(formData.get("demo") ?? "").trim() || null;

  if (!title || !description || !image || !content || tags.length === 0) {
    return { error: "Title, description, image, content, and at least one tag are required." };
  }

  const projectSlug = slugInput || slugify(title);
  const existing = await prisma.project.findUnique({ where: { slug: projectSlug } });
  if (existing) {
    return { error: "A project with this slug already exists." };
  }

  const maxOrder = await prisma.project.aggregate({ _max: { sortOrder: true } });

  await prisma.project.create({
    data: {
      slug: projectSlug,
      title,
      description,
      tags,
      image,
      content,
      techStack,
      github,
      demo,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidateProjectPaths(projectSlug);
  redirect(`/admin/projects/${projectSlug}/edit?saved=1`);
}

export async function updateProject(slug: string, formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const newSlug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const tags = formData
    .getAll("tags")
    .map((t) => String(t).trim())
    .filter((t): t is ProjectTag => VALID_TAGS.includes(t as ProjectTag));
  const techStack = parseList(String(formData.get("techStack") ?? ""));
  const github = String(formData.get("github") ?? "").trim() || null;
  const demo = String(formData.get("demo") ?? "").trim() || null;

  if (!title || !newSlug || !description || !image || !content || tags.length === 0) {
    return { error: "All required fields must be filled." };
  }

  if (newSlug !== slug) {
    const conflict = await prisma.project.findUnique({ where: { slug: newSlug } });
    if (conflict) {
      return { error: "A project with this slug already exists." };
    }
  }

  await prisma.project.update({
    where: { slug },
    data: {
      slug: newSlug,
      title,
      description,
      tags,
      image,
      content,
      techStack,
      github,
      demo,
    },
  });

  revalidateProjectPaths(newSlug);
  if (newSlug !== slug) revalidateProjectPaths(slug);
  redirect(`/admin/projects/${newSlug}/edit?saved=1`);
}

export async function deleteProject(slug: string) {
  await requireAuth();
  await prisma.project.delete({ where: { slug } });
  revalidateProjectPaths(slug);
  redirect("/admin/projects");
}

export async function reorderProjects(orderedSlugs: string[]) {
  await requireAuth();
  await prisma.$transaction(
    orderedSlugs.map((slug, index) =>
      prisma.project.update({ where: { slug }, data: { sortOrder: index } })
    )
  );
  revalidateProjectPaths();
  return { success: true };
}
