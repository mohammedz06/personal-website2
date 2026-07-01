import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllExperienceAdmin } from "@/lib/experience";
import { reorderExperienceItems } from "@/lib/actions/experience";
import ReorderList from "@/components/admin/ReorderList";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experience = await getAllExperienceAdmin();

  const items = experience.map((item) => ({
    id: item.itemId,
    title: item.role,
    subtitle: `${item.organization} · ${item.period}`,
    editHref: `/admin/experience/${item.itemId}/edit`,
  }));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-foreground">
            Experience
          </h1>
          <p className="mt-2 text-sm text-muted">
            Create, edit, and reorder experience entries.
          </p>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          New Entry
        </Link>
      </div>

      <div className="mt-10">
        {items.length > 0 ? (
          <ReorderList items={items} onReorder={reorderExperienceItems} />
        ) : (
          <p className="text-sm text-muted">No experience entries yet.</p>
        )}
      </div>
    </div>
  );
}
