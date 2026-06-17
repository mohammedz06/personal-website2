"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateBlogPost, deleteBlogPost } from "@/lib/actions/blog";
import ImageUploadField from "@/components/admin/ImageUploadField";
import DeleteButton from "@/components/admin/DeleteButton";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  content: string;
}

export default function BlogEditForm({
  post,
  saved,
}: {
  post: BlogPost;
  saved: boolean;
}) {
  const [image, setImage] = useState(post.image ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await updateBlogPost(post.slug, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  async function handleDelete() {
    await deleteBlogPost(post.slug);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      <h1 className="mt-6 font-serif text-3xl tracking-tight text-foreground">
        Edit Post
      </h1>

      {saved && (
        <p className="mt-4 border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          Changes saved successfully.
        </p>
      )}

      <form action={handleSubmit} className="mt-8 space-y-6">
        <Field label="Title" name="title" required defaultValue={post.title} />
        <Field label="Slug" name="slug" required defaultValue={post.slug} />
        <Field label="Date" name="date" type="date" required defaultValue={post.date} />
        <Field label="Excerpt" name="excerpt" required defaultValue={post.excerpt} />
        <ImageUploadField value={image} onChange={setImage} />
        <TextArea label="Content (MDX)" name="content" required rows={16} defaultValue={post.content} />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
          >
            Save Changes
          </button>
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-sm text-muted underline underline-offset-4 hover:text-foreground"
          >
            View on site
          </Link>
        </div>
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <DeleteButton label={post.title} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-wider text-muted uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/30"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  required,
  rows,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-wider text-muted uppercase">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows ?? 6}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-foreground/30"
      />
    </div>
  );
}
