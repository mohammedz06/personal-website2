import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";
import FadeIn from "@/components/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const paragraphs = project.content.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-2 py-0.5 text-[11px] tracking-wider text-muted uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          {project.title}
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
          {project.description.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-border bg-[#f5f4ea]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover p-10"
            priority
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-10 space-y-5">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-muted md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-xs tracking-[0.15em] text-muted uppercase">
            Tech Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-border px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>

      {(project.github || project.demo) && (
        <FadeIn delay={0.4}>
          <div className="mt-8 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-foreground/20 hover:text-foreground"
              >
                <Github size={14} />
                GitHub
                <ExternalLink
                  size={12}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-foreground/20 hover:text-foreground"
              >
                Live Demo
                <ExternalLink
                  size={12}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            )}
          </div>
        </FadeIn>
      )}
    </article>
  );
}
