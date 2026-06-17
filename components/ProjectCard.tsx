"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const tagColors: Record<string, string> = {
  Robotics: "border-foreground/20 text-foreground",
  Mechanical: "border-foreground/15 text-muted",
  Software: "border-foreground/10 text-muted",
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block border border-border bg-background transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_2px_20px_rgba(26,26,26,0.04)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#f5f4ea]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover p-8 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg tracking-tight text-foreground">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`border px-2 py-0.5 text-[11px] tracking-wider uppercase ${tagColors[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
