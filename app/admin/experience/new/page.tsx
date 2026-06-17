"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createExperienceItem } from "@/lib/actions/experience";

export default function NewExperiencePage() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await createExperienceItem(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/experience"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to Experience
      </Link>

      <h1 className="mt-6 font-serif text-3xl tracking-tight text-foreground">
        New Experience Entry
      </h1>

      <form action={handleSubmit} className="mt-10 space-y-6">
        <Field label="Role" name="role" required />
        <Field label="Organization" name="organization" required />
        <Field label="Period" name="period" required placeholder="e.g. 2024 — Present" />
        <Field label="ID" name="id" placeholder="auto-generated if empty" />
        <TextArea label="Description" name="description" required rows={4} />
        <TextArea label="Highlights" name="highlights" rows={6} hint="One bullet point per line." />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
        >
          Create Entry
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
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
