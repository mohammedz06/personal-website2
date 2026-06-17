import { notFound } from "next/navigation";
import { getExperienceByIdAdmin } from "@/lib/experience";
import ExperienceEditForm from "@/components/admin/ExperienceEditForm";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}

export default async function EditExperiencePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved } = await searchParams;
  const item = await getExperienceByIdAdmin(id);
  if (!item) notFound();

  return <ExperienceEditForm item={item} saved={saved === "1"} />;
}
