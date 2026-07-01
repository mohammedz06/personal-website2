import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/blog";
import { reorderBlogPosts } from "@/lib/actions/blog";
import ReorderList from "@/components/admin/ReorderList";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await getAllPostsAdmin();

  const items = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    subtitle: `${formatDate(post.date)} · /blog/${post.slug}`,
    editHref: `/admin/blogs/${post.slug}/edit`,
  }));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-foreground">
            Blog Posts
          </h1>
          <p className="mt-2 text-sm text-muted">
            Create, edit, and reorder blog entries.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="mt-10">
        {items.length > 0 ? (
          <ReorderList items={items} onReorder={reorderBlogPosts} />
        ) : (
          <p className="text-sm text-muted">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
