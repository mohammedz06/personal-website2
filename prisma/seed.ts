import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PrismaClient } from "@prisma/client";
import { projects } from "../content/projects";
import { experience } from "../content/experience";

const prisma = new PrismaClient();
const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function seedBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(raw);

    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        image: (data.image as string | undefined) ?? null,
        content,
        sortOrder: i,
      },
      create: {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        image: (data.image as string | undefined) ?? null,
        content,
        sortOrder: i,
      },
    });
  }
}

async function seedProjects() {
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        tags: project.tags,
        image: project.image,
        content: project.content,
        techStack: project.techStack,
        github: project.github ?? null,
        demo: project.demo ?? null,
        sortOrder: i,
      },
      create: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        tags: project.tags,
        image: project.image,
        content: project.content,
        techStack: project.techStack,
        github: project.github ?? null,
        demo: project.demo ?? null,
        sortOrder: i,
      },
    });
  }
}

async function seedExperience() {
  for (let i = 0; i < experience.length; i++) {
    const item = experience[i];
    await prisma.experienceItem.upsert({
      where: { itemId: item.id },
      update: {
        role: item.role,
        organization: item.organization,
        period: item.period,
        description: item.description,
        highlights: item.highlights,
        sortOrder: i,
      },
      create: {
        itemId: item.id,
        role: item.role,
        organization: item.organization,
        period: item.period,
        description: item.description,
        highlights: item.highlights,
        sortOrder: i,
      },
    });
  }
}

async function main() {
  console.log("Seeding database...");
  await seedBlogPosts();
  await seedProjects();
  await seedExperience();
  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
