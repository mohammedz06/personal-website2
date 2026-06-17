"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { ChevronUp, ChevronDown, GripVertical } from "lucide-react";

export interface ReorderListItem {
  id: string;
  title: string;
  subtitle: string;
  editHref: string;
}

interface ReorderListProps {
  items: ReorderListItem[];
  onReorder: (orderedKeys: string[]) => Promise<{ success?: boolean; error?: string }>;
}

export default function ReorderList({ items, onReorder }: ReorderListProps) {
  const [order, setOrder] = useState(items);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setOrder(items);
  }, [items]);

  function move(index: number, direction: -1 | 1) {
    const next = [...order];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    startTransition(async () => {
      await onReorder(next.map((item) => item.id));
    });
  }

  return (
    <div className={`space-y-2 ${isPending ? "opacity-60" : ""}`}>
      {order.map((item, index) => (
        <div
          key={item.id}
          className="flex items-stretch gap-2 border border-border bg-background"
        >
          <div className="flex flex-col border-r border-border">
            <button
              type="button"
              disabled={index === 0 || isPending}
              onClick={() => move(index, -1)}
              className="px-2 py-1 text-muted hover:text-foreground disabled:opacity-30"
              aria-label="Move up"
            >
              <ChevronUp size={14} />
            </button>
            <div className="flex flex-1 items-center justify-center px-2 text-muted">
              <GripVertical size={14} />
            </div>
            <button
              type="button"
              disabled={index === order.length - 1 || isPending}
              onClick={() => move(index, 1)}
              className="px-2 py-1 text-muted hover:text-foreground disabled:opacity-30"
              aria-label="Move down"
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted">{item.subtitle}</p>
            </div>
            <Link
              href={item.editHref}
              className="shrink-0 border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
