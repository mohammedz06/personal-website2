import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on robotics, mechanical design, software, and the process of building things.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <SectionHeader
        title="Blog"
        description="Technical notes, build logs, and reflections on engineering work."
      />

      <div className="mt-12 flex flex-col gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))
        ) : (
          <p className="text-sm text-muted">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
