"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { slugify as blogSlugify } from "@/lib/blog";

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}

export async function createBlogPost(formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !date || !excerpt || !content) {
    return { error: "Title, date, excerpt, and content are required." };
  }

  const slug = slugInput || blogSlugify(title);
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return { error: "A post with this slug already exists." };
  }

  const maxOrder = await prisma.blogPost.aggregate({ _max: { sortOrder: true } });

  await prisma.blogPost.create({
    data: {
      slug,
      title,
      date,
      excerpt,
      image,
      content,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidateBlogPaths(slug);
  redirect(`/admin/blogs/${slug}/edit?saved=1`);
}

export async function updateBlogPost(slug: string, formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const newSlug = String(formData.get("slug") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !newSlug || !date || !excerpt || !content) {
    return { error: "All required fields must be filled." };
  }

  if (newSlug !== slug) {
    const conflict = await prisma.blogPost.findUnique({ where: { slug: newSlug } });
    if (conflict) {
      return { error: "A post with this slug already exists." };
    }
  }

  await prisma.blogPost.update({
    where: { slug },
    data: { slug: newSlug, title, date, excerpt, image, content },
  });

  revalidateBlogPaths(newSlug);
  if (newSlug !== slug) revalidateBlogPaths(slug);
  redirect(`/admin/blogs/${newSlug}/edit?saved=1`);
}

export async function deleteBlogPost(slug: string) {
  await requireAuth();
  await prisma.blogPost.delete({ where: { slug } });
  revalidateBlogPaths(slug);
  redirect("/admin/blogs");
}

export async function reorderBlogPosts(orderedSlugs: string[]) {
  await requireAuth();
  await prisma.$transaction(
    orderedSlugs.map((slug, index) =>
      prisma.blogPost.update({ where: { slug }, data: { sortOrder: index } })
    )
  );
  revalidateBlogPaths();
  return { success: true };
}
