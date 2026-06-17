import { prisma } from "@/lib/prisma";
import type { ExperienceItem } from "@/content/experience";

function mapExperience(item: {
  itemId: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}): ExperienceItem {
  return {
    id: item.itemId,
    role: item.role,
    organization: item.organization,
    period: item.period,
    description: item.description,
    highlights: item.highlights,
  };
}

export async function getAllExperience(): Promise<ExperienceItem[]> {
  const items = await prisma.experienceItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return items.map(mapExperience);
}

export async function getExperienceById(id: string): Promise<ExperienceItem | undefined> {
  const item = await prisma.experienceItem.findUnique({ where: { itemId: id } });
  return item ? mapExperience(item) : undefined;
}

export async function getAllExperienceAdmin() {
  return prisma.experienceItem.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getExperienceByIdAdmin(id: string) {
  return prisma.experienceItem.findUnique({ where: { itemId: id } });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
