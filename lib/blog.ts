import { prisma } from "@/lib/prisma";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  content: string;
}

function mapPost(post: {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  content: string;
}): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    image: post.image ?? undefined,
    content: post.content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ sortOrder: "asc" }, { date: "desc" }],
  });
  return posts.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return post ? mapPost(post) : undefined;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
    orderBy: { sortOrder: "asc" },
  });
  return posts.map((p) => p.slug);
}

export async function getAllPostsAdmin() {
  return prisma.blogPost.findMany({
    orderBy: [{ sortOrder: "asc" }, { date: "desc" }],
  });
}

export async function getPostBySlugAdmin(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
