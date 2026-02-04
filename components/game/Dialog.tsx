"use client";

import { useEffect, useRef } from "react";

type Props = {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
};

export default function Dialog({ title, content, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      className="absolute inset-0 z-10 flex items-end justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="mb-6 w-[90%] max-w-md rounded-lg border border-white
           bg-gray-900 p-4 text-white outline-none
           animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        <div className="flex items-center justify-between">
          <h2 id="dialog-title" className="text-lg font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm hover:bg-gray-700"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 text-sm">{content}</div>

        <div className="mt-4 text-right text-xs text-gray-400">
          Press ESC to close
        </div>
      </div>
    </div>
  );
}
