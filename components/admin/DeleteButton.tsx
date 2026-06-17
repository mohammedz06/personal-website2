"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  label: string;
  onDelete: () => Promise<void>;
}

export default function DeleteButton({ label, onDelete }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-2 border border-red-200 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded border border-red-200 bg-red-50 px-4 py-3">
      <p className="text-sm text-red-700">
        Delete <strong>{label}</strong>? This cannot be undone.
      </p>
      <button
        type="button"
        disabled={loading}
        onClick={handleDelete}
        className="bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Deleting…" : "Confirm"}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => setConfirming(false)}
        className="px-3 py-1.5 text-sm text-muted"
      >
        Cancel
      </button>
    </div>
  );
}
