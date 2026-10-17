"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ClickCard from "./ClickCard";
import { projects, projectCategories } from "@/data/portfolio";

export default function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const shortLabel: Record<string, string> = {
    All: "All",
    "Industry Award": "Industry",
    "System Architecture": "Systems",
    "Data Analytics": "Data",
  };

  const counts = {
    All: projects.length,
    "Industry Award": projects.filter((p) => p.category === "Industry Award").length,
    "System Architecture": projects.filter((p) => p.category === "System Architecture").length,
    "Data Analytics": projects.filter((p) => p.category === "Data Analytics").length,
  } as const;

  const byCategory = category === "All" ? projects : projects.filter((p) => p.category === category);
  const q = query.trim().toLowerCase();
  const filtered = q
    ? byCategory.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.highlight.toLowerCase().includes(q),
      )
    : byCategory;

  const visibleGrid = category === "All" && !q && !showAll ? filtered.slice(0, 6) : filtered;
  const hiddenCount = filtered.length - visibleGrid.length;
  const showToggle = category === "All" && !q && filtered.length > 6;

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        eyebrow="Selected work"
        title={`${projects.length} projects, 3 tracks`}
        copy="Spanning industry award-winners, systems architecture, and data analytics—each codebase fully documented and open-sourced on GitHub."
      />

      {/* filters with counts + search aligned — 2 per row on mobile */}
      <div className="mt-8 flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setShowAll(false);
              }}
              className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                category === c
                  ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-black"
                  : "border border-black/10 text-zinc-600 hover:bg-black/[.05] dark:border-white/15 dark:text-zinc-400 dark:hover:bg-white/[.07]"
              }`}
            >
              <span className="sm:hidden">{shortLabel[c]}</span><span className="hidden sm:inline">{c}</span> <span className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${category === c ? "bg-white/15 text-white" : "bg-black/[.06] text-zinc-600 dark:bg-white/[.08] dark:text-zinc-400"}`}>{counts[c as keyof typeof counts]}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full shrink-0 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowAll(false);
            }}
            placeholder="⌕ Filter by tech… e.g. Figma, Python"
            className="w-full rounded-full border border-black/10 bg-white py-2.5 pl-9 pr-9 text-sm placeholder:text-zinc-400 focus:border-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-500/15 dark:border-white/15 dark:bg-white/[.04] dark:placeholder:text-zinc-500"
          />
          {q && (
            <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/[.06] px-2.5 py-1 text-xs dark:bg-white/[.08]">Clear</button>
          )}
        </div>
      </div>
      {q && <p className="mt-3 text-xs text-zinc-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""} for “{q}”</p>}

      <motion.div layout className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleGrid.map((p) => (
            <ClickCard
              key={p.title}
              project={p}
              mounted={mounted}
              onVideo={setVideoSrc}
              onPdf={setPdfSrc}
              onImage={setImageSrc}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-black/10 bg-white p-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:bg-white/[.03]">No matches for “{q}” in {category}. Try another tech or category.</p>
      )}

      {showToggle && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
          >
            {showAll ? "Show less ↑" : `Show all ${filtered.length} projects (${hiddenCount} more) ↓`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {videoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setVideoSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-[92%] max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoSrc(null)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-black hover:bg-white"
              >
                ✕
              </button>
              <video controls autoPlay playsInline className="h-auto max-h-[72vh] w-full object-contain">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="flex justify-between bg-zinc-900 px-4 py-3 text-xs text-zinc-400">
                <span>{videoSrc?.includes("EDM_Medical_SQL") ? "EDM Dashboard Demo — hosted on GitHub" : videoSrc?.includes("Fundamentals_Software_Testing_Selenium") ? "Demo by group member Ken Escolar — hosted on GitHub" : "MetroStay Demo — hosted on GitHub"}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pdfSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setPdfSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex h-[85vh] w-[95%] max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-4 py-3 text-sm text-white">
                <span className="font-medium">{pdfSrc?.includes("Datamining_Final_Report") ? "Wine Quality — Report" : pdfSrc?.includes("Airline_Service_Analysis") ? "Airline Service — Report" : "Hotel Management SAD — Slides"}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPdfSrc(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">✕</button>
                </div>
              </div>
              <iframe src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfSrc)}`} title="Slides" className="h-full w-full flex-1 border-0" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {imageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setImageSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex max-h-[85vh] w-[95%] max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-slate-900 px-4 py-3 text-sm text-white">
                <span className="truncate font-medium">{imageSrc.includes("industry_choice") ? "MNLFlow — Industry Choice Award" : "CESCon — Highest Sales Award"}</span>
                <button onClick={() => setImageSrc(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">✕</button>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-100 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Certificate" className="max-h-[70vh] max-w-full object-contain shadow-lg" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
