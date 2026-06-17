"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Briefcase,
  Clock,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blogs", label: "Blog", icon: FileText },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/experience", label: "Experience", icon: Clock },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-background">
      <div className="border-b border-border px-5 py-6">
        <p className="text-xs tracking-[0.15em] text-muted uppercase">CMS</p>
        <p className="mt-1 font-serif text-lg text-foreground">Admin</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-muted hover:bg-border/50 hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-muted transition-colors hover:bg-border/50 hover:text-foreground"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
