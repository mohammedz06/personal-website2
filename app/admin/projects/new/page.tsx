"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProject } from "@/lib/actions/projects";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { ProjectTag } from "@/content/projects";

const TAGS: ProjectTag[] = ["Robotics", "Mechanical", "Software"];

export default function NewProjectPage() {
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await createProject(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      <h1 className="mt-6 font-serif text-3xl tracking-tight text-foreground">
        New Project
      </h1>

      <form action={handleSubmit} className="mt-10 space-y-6">
        <Field label="Title" name="title" required />
        <Field label="Slug" name="slug" placeholder="auto-generated from title if empty" />
        <Field label="Description" name="description" required />
        <TagSelect />
        <ImageUploadField value={image} onChange={setImage} />
        <TextArea label="Content" name="content" required rows={12} hint="Separate paragraphs with a blank line." />
        <TextArea label="Tech Stack" name="techStack" rows={4} hint="One item per line." />
        <Field label="GitHub URL" name="github" type="url" />
        <Field label="Demo URL" name="demo" type="url" />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

function TagSelect() {
  return (
    <div>
      <p className="block text-xs tracking-wider text-muted uppercase">Tags</p>
      <p className="mt-1 text-xs text-muted">Select at least one tag.</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {TAGS.map((tag) => (
          <label key={tag} className="inline-flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="tags" value={tag} className="accent-foreground" />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  hint?: string;
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
        className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/30"
      />
    </div>
  );
}
