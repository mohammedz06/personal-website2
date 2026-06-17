import type { Metadata } from "next";
import { getAllExperience } from "@/lib/experience";
import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles, research, and leadership experience in engineering and robotics.",
};

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experience = await getAllExperience();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <SectionHeader
        title="Experience"
        description="Research, competition teams, and industry roles that shaped my approach to building systems."
      />

      <div className="mt-16">
        <Timeline items={experience} />
      </div>
    </div>
  );
}
