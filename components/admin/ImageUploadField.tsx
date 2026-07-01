"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

interface ImageUploadFieldProps {
  name?: string;
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadField({
  name = "image",
  label = "Image",
  value,
  onChange,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="block text-xs tracking-wider text-muted uppercase">
        {label}
      </label>

      <input type="hidden" name={name} value={value} />

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
        {value && (
          <div className="relative h-24 w-40 shrink-0 overflow-hidden border border-border bg-[#f5f4ea]">
            <img src={value} alt="Preview" className="h-full w-full object-cover p-3" />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or /uploads/..."
            className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-foreground/30"
          />

          <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-foreground/20 hover:text-foreground">
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
