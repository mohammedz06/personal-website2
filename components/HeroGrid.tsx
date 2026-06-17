"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    updateSize();
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateSize);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateSize);
    };
  }, [handleMouseMove]);

  const gridSize = 40;
  const cols = Math.ceil(dimensions.width / gridSize) + 1;
  const rows = Math.ceil(dimensions.height / gridSize) + 1;

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="grid-fade"
            cx={`${mouse.x * 100}%`}
            cy={`${mouse.y * 100}%`}
            r="40%"
          >
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {Array.from({ length: cols }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * gridSize}
            y1={0}
            x2={i * gridSize}
            y2={dimensions.height}
            stroke="#1a1a1a"
            strokeOpacity={0.04}
            strokeWidth={0.5}
          />
        ))}

        {Array.from({ length: rows }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * gridSize}
            x2={dimensions.width}
            y2={i * gridSize}
            stroke="#1a1a1a"
            strokeOpacity={0.04}
            strokeWidth={0.5}
          />
        ))}

        <rect width="100%" height="100%" fill="url(#grid-fade)" />
      </svg>

      <motion.div
        className="absolute h-32 w-32 rounded-full border border-foreground/5"
        style={{
          left: `calc(${mouse.x * 100}% - 64px)`,
          top: `calc(${mouse.y * 100}% - 64px)`,
        }}
        animate={{
          rotate: mouse.x * 90,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />

      <motion.div
        className="absolute h-2 w-2 rounded-full bg-foreground/10"
        style={{
          left: `calc(${mouse.x * 100}% - 4px)`,
          top: `calc(${mouse.y * 100}% - 4px)`,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
      />
    </div>
  );
}
