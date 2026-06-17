"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
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
        href={`/blog/${post.slug}`}
        className="group flex flex-col border border-border bg-background transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_2px_20px_rgba(26,26,26,0.04)] sm:flex-row"
      >
        {post.image && (
          <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-border bg-[#f5f4ea] sm:aspect-auto sm:w-48 sm:border-b-0 sm:border-r">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover p-4 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center p-5">
          <time className="text-xs tracking-wider text-muted uppercase">
            {formatDate(post.date)}
          </time>

          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg tracking-tight text-foreground">
              {post.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
