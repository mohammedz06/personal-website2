import type { Metadata } from "next";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mechanical engineering student focused on robotics, intelligent systems, and physical AI.",
};

const skillGroups = [
  {
    category: "Mechanical",
    skills: [
      "SolidWorks / CAD",
      "FEA & Simulation",
      "GD&T",
      "CNC Machining",
      "Rapid Prototyping",
      "Materials Selection",
    ],
  },
  {
    category: "Robotics",
    skills: [
      "ROS 2",
      "SLAM & Navigation",
      "Sensor Integration",
      "Motor Control",
      "Kinematics",
      "Gazebo Simulation",
    ],
  },
  {
    category: "Software",
    skills: [
      "Python",
      "C / C++",
      "TypeScript",
      "Embedded Systems",
      "Linux",
      "Git",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <SectionHeader title="About" />

      <FadeIn delay={0.1}>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:gap-12">
          <div className="shrink-0 md:w-44">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-[#f0efe4]">
              <Image
                src="/images/about/profile.svg"
                alt="Mohammed Zayed"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-2 text-center text-[10px] tracking-wider text-muted uppercase md:text-left">
              Replace with your photo
            </p>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
            <p>
              I&apos;m a mechanical engineering student with a focus on robotics
              and intelligent systems. I believe physical AI is the next logical
              step in the evolution of artificial intelligence, where machines
              move beyond computation and into meaningful interaction with the
              physical world.
            </p>
            <p>
              My work sits at the intersection of mechanical design, electronics,
              and software, building complete systems that can sense, act, and
              operate autonomously. I enjoy designing, whether that means CAD for
              mechanical assemblies, embedded systems for control, or integrating
              everything into a functional robotic system.
            </p>
            <p>
              I&apos;m especially interested in automation, robotic manipulation,
              and the development of reliable, real-world intelligent machines.
              My goal is to contribute to the engineering foundation that enables
              the future of physical AI.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-16">
          <h2 className="text-xs tracking-[0.15em] text-muted uppercase">
            Skills
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="font-serif text-lg text-foreground">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span className="h-px w-3 bg-border" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-xs tracking-[0.15em] text-muted uppercase">
            Interests
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Automation, robotic manipulation, bipedal locomotion, and the
            engineering foundations behind reliable intelligent machines in the
            real world.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
