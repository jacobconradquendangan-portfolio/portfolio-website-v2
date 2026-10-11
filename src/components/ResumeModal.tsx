"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { profile } from "@/data/portfolio";

/**
 * Shared résumé viewer modal.
 * Open it from anywhere with: window.dispatchEvent(new Event("open-resume"));
 * Renders the PDF inline (via Google Docs viewer, same pattern as Certifications)
 * and offers a true cross-origin download + "open in new tab".
 */
export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-resume", onOpen);
    return () => window.removeEventListener("open-resume", onOpen);
  }, []);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleDownload = async () => {
    const filename = "QUENDANGAN_JacobConrad_Resume.pdf";
    try {
      const res = await fetch(profile.links.resume);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open the raw file in a new tab so the user can save it manually.
      window.open(profile.links.resume, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative flex h-[85vh] w-[95%] max-w-4xl flex-col overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-slate-900 px-4 py-3 text-sm text-white">
              <span className="truncate font-medium">{profile.name} — Résumé</span>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1.5 text-xs font-semibold transition hover:opacity-90"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume in new tab"
                  title="Open in new tab"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
                >
                  ✕
                </button>
              </div>
            </div>
            <iframe
              src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(profile.links.resume)}`}
              title={`${profile.name} — Résumé`}
              className="h-full w-full flex-1 border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
