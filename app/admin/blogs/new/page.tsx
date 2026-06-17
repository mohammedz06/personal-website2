"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createBlogPost } from "@/lib/actions/blog";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function NewBlogPostPage() {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await createBlogPost(formData);
    if (result?.error) {
      setError(result.error);
    }
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
        New Blog Post
      </h1>

      <form action={handleSubmit} className="mt-10 space-y-6">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" placeholder="auto-generated from title if empty" />
        <Field label="Date" name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} />
        <Field label="Excerpt" name="excerpt" required />
        <ImageUploadField value={image} onChange={setImage} />
        <TextArea label="Content (MDX)" name="content" required rows={16} hint="Supports Markdown and MDX syntax." />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
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
  hint,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  hint?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-wider text-muted uppercase">
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
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
