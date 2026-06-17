"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/content/experience";

interface TimelineProps {
  items: ExperienceItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border md:left-[11px]" />

      <div className="flex flex-col gap-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute top-1.5 left-0 h-[15px] w-[15px] border border-foreground/30 bg-background md:h-[23px] md:w-[23px]" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-serif text-xl tracking-tight text-foreground">
                {item.role}
              </h3>
              <span className="text-xs tracking-wider text-muted uppercase">
                {item.period}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted">{item.organization}</p>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.description}
            </p>

            <ul className="mt-4 flex flex-col gap-2">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 h-px w-3 shrink-0 bg-border" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
