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
      className="absolute inset-0 z-50 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* This wrapper keeps the modal inside the game and below the HUD */}
      <div className="absolute inset-0 pt-20 pb-6 px-4 flex items-center justify-center">
        {/* Modal box: fixed header/footer, scrollable body */}
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="
            w-full max-w-xl
            rounded-xl border border-white/15
            bg-gray-950/95 text-white
            shadow-2xl shadow-black/60
            outline-none
            max-h-[calc(100%-6rem)]
            flex flex-col
          "
        >
          {/* Header (sticky) */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
            <h2 id="dialog-title" className="text-xl font-bold leading-tight">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* Body (scroll) */}
          <div className="px-5 py-4 overflow-auto">
            <div className="text-base leading-relaxed text-white/90">
              {content}
            </div>
          </div>

          {/* Footer (sticky) */}
          <div className="border-t border-white/10 px-5 py-3 text-right text-xs text-white/60">
            Press <span className="kbd">Esc</span> to close
          </div>
        </div>
      </div>
    </div>
  );
}
