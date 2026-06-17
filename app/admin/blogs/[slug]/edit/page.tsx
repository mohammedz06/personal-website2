import { notFound } from "next/navigation";
import { getPostBySlugAdmin } from "@/lib/blog";
import BlogEditForm from "@/components/admin/BlogEditForm";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}

export default async function EditBlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const post = await getPostBySlugAdmin(slug);
  if (!post) notFound();

  return <BlogEditForm post={post} saved={saved === "1"} />;
}
