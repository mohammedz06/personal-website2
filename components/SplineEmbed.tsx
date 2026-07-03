"use client";

import { useEffect, useRef, useState } from "react";

export default function SplineEmbed() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js";
    script.async = true;
    script.type = "module";
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptLoaded(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !viewerRef.current) return;

    const viewer = document.createElement("spline-viewer");
    viewer.setAttribute(
      "url",
      "https://prod.spline.design/0odDNTFsh2lDcmOg/scene.splinecode"
    );
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.display = "block";

    viewerRef.current.appendChild(viewer);

    return () => {
      if (viewerRef.current?.contains(viewer)) {
        viewerRef.current.removeChild(viewer);
      }
    };
  }, [scriptLoaded]);

  return (
    <div className="relative h-full w-full">
      <div ref={viewerRef} className="h-full w-full" />
    </div>
  );
}
