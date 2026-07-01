import { notFound } from "next/navigation";
import { getProjectBySlugAdmin } from "@/lib/projects";
import ProjectEditForm from "@/components/admin/ProjectEditForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}

export default async function EditProjectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const project = await getProjectBySlugAdmin(slug);
  if (!project) notFound();

  return <ProjectEditForm project={project} saved={saved === "1"} />;
}
