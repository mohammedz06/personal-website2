import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroGrid from "@/components/HeroGrid";
import FadeIn from "@/components/FadeIn";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <HeroGrid />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-16 px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="lg:pr-10">
            <FadeIn>
              <p className="text-xs tracking-[0.2em] text-muted uppercase">
                Portfolio
              </p>
            </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight text-foreground md:text-7xl">
              Mohammed Zayed
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg tracking-wide text-muted md:text-xl">
              Mechanical Engineering · Robotics
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
              I build mechanical systems and robots that solve problems.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm tracking-wide text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                View Projects
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm tracking-wide text-muted transition-all duration-300 hover:border-foreground/20 hover:text-foreground"
              >
                Read Blog
              </Link>
            </div>
          </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px bg-border md:grid-cols-3">
          {[
            {
              label: "Discipline",
              value: "Mechanical Engineering",
              sub: "Queen's University · Expected 2028",
            },
            {
              label: "Focus",
              value: "Mechanics · Electronics · Software",
              sub: "Integrated robotic systems",
            },
            {
              label: "Currently",
              value: "8DOF ESP32 Bipedal Robot",
              sub: "Building in progress",
            },
          ].map((item) => (
            <div key={item.label} className="bg-background px-6 py-8">
              <p className="text-xs tracking-[0.15em] text-muted uppercase">
                {item.label}
              </p>
              <p className="mt-2 font-serif text-lg text-foreground">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-muted">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
