import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx-components";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <FadeIn>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All Posts
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <time className="mt-8 block text-xs tracking-wider text-muted uppercase">
          {formatDate(post.date)}
        </time>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          {post.title}
        </h1>
      </FadeIn>

      {post.image && (
        <FadeIn delay={0.2}>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-border bg-[#f5f4ea]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover p-8"
              priority
            />
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.25}>
        <div className="prose mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </FadeIn>
    </article>
  );
}
