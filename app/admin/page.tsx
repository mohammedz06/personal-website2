import Link from "next/link";
import { FileText, Briefcase, Clock, Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/blog";
import { getAllProjectsAdmin } from "@/lib/projects";
import { getAllExperienceAdmin } from "@/lib/experience";

export default async function AdminDashboardPage() {
  const [posts, projects, experience] = await Promise.all([
    getAllPostsAdmin(),
    getAllProjectsAdmin(),
    getAllExperienceAdmin(),
  ]);

  const sections = [
    {
      title: "Blog Posts",
      count: posts.length,
      href: "/admin/blogs",
      newHref: "/admin/blogs/new",
      icon: FileText,
    },
    {
      title: "Projects",
      count: projects.length,
      href: "/admin/projects",
      newHref: "/admin/projects/new",
      icon: Briefcase,
    },
    {
      title: "Experience",
      count: experience.length,
      href: "/admin/experience",
      newHref: "/admin/experience/new",
      icon: Clock,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-serif text-3xl tracking-tight text-foreground">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-muted">
        Manage the content displayed on your portfolio website.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {sections.map(({ title, count, href, newHref, icon: Icon }) => (
          <div key={title} className="border border-border p-6">
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-muted" />
              <h2 className="font-serif text-lg text-foreground">{title}</h2>
            </div>
            <p className="mt-4 text-3xl font-light text-foreground">{count}</p>
            <p className="text-xs text-muted uppercase tracking-wider">
              {count === 1 ? "entry" : "entries"}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={href}
                className="border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                Manage
              </Link>
              <Link
                href={newHref}
                className="inline-flex items-center gap-1.5 bg-foreground px-3 py-1.5 text-sm text-background transition-opacity hover:opacity-90"
              >
                <Plus size={14} />
                New
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
