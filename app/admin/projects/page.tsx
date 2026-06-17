import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProjectsAdmin } from "@/lib/projects";
import { reorderProjects } from "@/lib/actions/projects";
import ReorderList from "@/components/admin/ReorderList";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  const items = projects.map((project) => ({
    id: project.slug,
    title: project.title,
    subtitle: `${project.tags.join(", ")} · /projects/${project.slug}`,
    editHref: `/admin/projects/${project.slug}/edit`,
  }));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tight text-foreground">
            Projects
          </h1>
          <p className="mt-2 text-sm text-muted">
            Create, edit, and reorder project entries.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <div className="mt-10">
        {items.length > 0 ? (
          <ReorderList items={items} onReorder={reorderProjects} />
        ) : (
          <p className="text-sm text-muted">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
