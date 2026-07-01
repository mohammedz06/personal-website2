"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function SplineEmbed() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute(
      "url",
      "https://prod.spline.design/0odDNTFsh2lDcmOg/scene.splinecode"
    );
    viewer.setAttribute("class", "h-full w-full");
    viewerRef.current.appendChild(viewer);

    return () => {
      viewerRef.current?.removeChild(viewer);
    };
  }, []);

  return (
    <>
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js"
        strategy="afterInteractive"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border bg-[#f6f3e8] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.45)]">
        <div ref={viewerRef} className="h-full w-full" />
      </div>
    </>
  );
}
