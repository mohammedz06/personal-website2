"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateExperienceItem, deleteExperienceItem } from "@/lib/actions/experience";
import DeleteButton from "@/components/admin/DeleteButton";

interface ExperienceItem {
  itemId: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export default function ExperienceEditForm({
  item,
  saved,
}: {
  item: ExperienceItem;
  saved: boolean;
}) {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const result = await updateExperienceItem(item.itemId, formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  async function handleDelete() {
    await deleteExperienceItem(item.itemId);
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
        Edit Experience
      </h1>

      {saved && (
        <p className="mt-4 border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          Changes saved successfully.
        </p>
      )}

      <form action={handleSubmit} className="mt-8 space-y-6">
        <Field label="Role" name="role" required defaultValue={item.role} />
        <Field label="Organization" name="organization" required defaultValue={item.organization} />
        <Field label="Period" name="period" required defaultValue={item.period} />
        <Field label="ID" name="id" required defaultValue={item.itemId} />
        <TextArea label="Description" name="description" required rows={4} defaultValue={item.description} />
        <TextArea label="Highlights" name="highlights" rows={6} defaultValue={item.highlights.join("\n")} hint="One bullet point per line." />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-foreground px-6 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-12 border-t border-border pt-8">
        <DeleteButton label={item.role} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
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
