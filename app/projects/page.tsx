import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering projects in robotics, mechanical design, and software.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeader
        title="Projects"
        description="Selected work across robotics, mechanical engineering, and software — from concept to prototype."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
