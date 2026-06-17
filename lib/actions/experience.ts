"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { slugify } from "@/lib/experience";

function parseHighlights(raw: string): string[] {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidateExperiencePaths() {
  revalidatePath("/experience");
  revalidatePath("/");
}

export async function createExperienceItem(formData: FormData) {
  await requireAuth();

  const role = String(formData.get("role") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const idInput = String(formData.get("id") ?? "").trim();
  const highlights = parseHighlights(String(formData.get("highlights") ?? ""));

  if (!role || !organization || !period || !description) {
    return { error: "Role, organization, period, and description are required." };
  }

  const itemId = idInput || slugify(`${role}-${organization}`);
  const existing = await prisma.experienceItem.findUnique({ where: { itemId } });
  if (existing) {
    return { error: "An experience item with this ID already exists." };
  }

  const maxOrder = await prisma.experienceItem.aggregate({ _max: { sortOrder: true } });

  await prisma.experienceItem.create({
    data: {
      itemId,
      role,
      organization,
      period,
      description,
      highlights,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  revalidateExperiencePaths();
  redirect(`/admin/experience/${itemId}/edit?saved=1`);
}

export async function updateExperienceItem(id: string, formData: FormData) {
  await requireAuth();

  const role = String(formData.get("role") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const newId = String(formData.get("id") ?? "").trim();
  const highlights = parseHighlights(String(formData.get("highlights") ?? ""));

  if (!role || !organization || !period || !description || !newId) {
    return { error: "All required fields must be filled." };
  }

  if (newId !== id) {
    const conflict = await prisma.experienceItem.findUnique({ where: { itemId: newId } });
    if (conflict) {
      return { error: "An experience item with this ID already exists." };
    }
  }

  await prisma.experienceItem.update({
    where: { itemId: id },
    data: { itemId: newId, role, organization, period, description, highlights },
  });

  revalidateExperiencePaths();
  redirect(`/admin/experience/${newId}/edit?saved=1`);
}

export async function deleteExperienceItem(id: string) {
  await requireAuth();
  await prisma.experienceItem.delete({ where: { itemId: id } });
  revalidateExperiencePaths();
  redirect("/admin/experience");
}

export async function reorderExperienceItems(orderedIds: string[]) {
  await requireAuth();
  await prisma.$transaction(
    orderedIds.map((itemId, index) =>
      prisma.experienceItem.update({ where: { itemId }, data: { sortOrder: index } })
    )
  );
  revalidateExperiencePaths();
  return { success: true };
}
