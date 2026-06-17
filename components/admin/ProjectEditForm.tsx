"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateProject, deleteProject } from "@/lib/actions/projects";
import ImageUploadField from "@/components/admin/ImageUploadField";
import DeleteButton from "@/components/admin/DeleteButton";
import type { ProjectTag } from "@/content/projects";

const TAGS: ProjectTag[] = ["Robotics", "Mechanical", "Software"];

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  content: string;
  techStack: string[];
  github: string | null;
  demo: string | null;
}

export default function ProjectEditForm({
  project,
  saved,
}: {
  project: Project;
  saved: boolean;
}) {
  const [image, setImage] = useState(project.image);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await updateProject(project.slug, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  async function handleDelete() {
    await deleteProject(project.slug);
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
        Edit Project
      </h1>

      {saved && (
        <p className="mt-4 border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          Changes saved successfully.
        </p>
      )}

      <form action={handleSubmit} className="mt-8 space-y-6">
        <Field label="Title" name="title" required defaultValue={project.title} />
        <Field label="Slug" name="slug" required defaultValue={project.slug} />
        <Field label="Description" name="description" required defaultValue={project.description} />
        <TagSelect selected={project.tags} />
        <ImageUploadField value={image} onChange={setImage} />
        <TextArea label="Content" name="content" required rows={12} defaultValue={project.content} />
        <TextArea label="Tech Stack" name="techStack" rows={4} defaultValue={project.techStack.join("\n")} hint="One item per line." />
        <Field label="GitHub URL" name="github" type="url" defaultValue={project.github ?? ""} />
        <Field label="Demo URL" name="demo" type="url" defaultValue={project.demo ?? ""} />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
          >
            Save Changes
          </button>
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="text-sm text-muted underline underline-offset-4 hover:text-foreground"
          >
            View on site
          </Link>
        </div>
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <DeleteButton label={project.title} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function TagSelect({ selected }: { selected: string[] }) {
  return (
    <div>
      <p className="block text-xs tracking-wider text-muted uppercase">Tags</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {TAGS.map((tag) => (
          <label key={tag} className="inline-flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="tags"
              value={tag}
              defaultChecked={selected.includes(tag)}
              className="accent-foreground"
            />
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
        className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/30"
      />
    </div>
  );
}
