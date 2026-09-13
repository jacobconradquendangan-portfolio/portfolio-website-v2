"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Star } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import { projects, projectCategories } from "@/data/portfolio";

const highlightStyle: Record<string, string> = {
  "Industry Award": "bg-indigo-600",
  "System Architecture": "bg-slate-900",
  "Data Analytics": "bg-teal-600",
};

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

  // Featured hero: CV Builder when it passes current filters
  const hero = filtered.find((p) => p.title === "CV Builder");
  const gridFiltered = hero ? filtered.filter((p) => p !== hero) : filtered;
  const visibleGrid = category === "All" && !q && !showAll ? gridFiltered.slice(0, 6) : gridFiltered;
  const hiddenCount = gridFiltered.length - visibleGrid.length;
  const showToggle = category === "All" && !q && gridFiltered.length > 6;

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

      {/* Featured hero — horizontal banner */}
      {hero && (
        <motion.div layout className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] dark:border-white/[.09] dark:bg-slate-900">
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            <div className="relative h-56 overflow-hidden border-b border-zinc-200 bg-black sm:h-64 dark:border-zinc-700 md:h-auto md:min-h-[320px]">
              {hero.image ? (
                <Image src={hero.image} alt={hero.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${hero.gradient}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-zinc-900 shadow-sm sm:right-4 sm:top-4 sm:gap-1.5 sm:rounded-full sm:px-3">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
              </span>
            </div>
            <div className="flex flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex h-2 w-2 rounded-full ${highlightStyle[hero.category] ?? "bg-violet-500"}`} />
                <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">{hero.category}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 lg:flex-nowrap lg:overflow-hidden">
                {hero.tags.map((t) => (
                  <span key={t} className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium whitespace-nowrap shrink-0 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{t}</span>
                ))}
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{hero.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:line-clamp-4">{hero.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-700 sm:gap-3 sm:pt-6">
                <a href={hero.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black sm:px-4 sm:py-2 sm:text-sm">
                  <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> View on GitHub
                </a>
                {hero.live && (
                  <a href={hero.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold hover:border-violet-300 hover:text-violet-600 dark:border-zinc-700 sm:px-4 sm:py-2 sm:text-sm">Live ↗</a>
                )}
                {hero.video && (
                  <button onClick={() => setVideoSrc(hero.video!)} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold hover:border-violet-300 hover:text-violet-600 dark:border-zinc-700 sm:px-4 sm:py-2 sm:text-sm">Video ▶</button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div layout className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleGrid.map((p, idx) => (
            <motion.article
              layout
              key={p.title}
              initial={mounted ? { opacity: 0, scale: 0.94 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="group mx-auto flex h-full w-full max-w-\[352px\] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md dark:border-white/[.09] dark:bg-slate-900"
            >
              <div className={`relative h-48 overflow-hidden border-b border-zinc-200 dark:border-zinc-700 ${p.image ? "bg-black" : `bg-gradient-to-br ${p.gradient}`} p-5`}>
                {p.image ? (
                  <>
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" priority={idx < 1 && !hero} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </>
                ) : (
                  <div className="bg-grid absolute inset-0 opacity-40" />
                )}
                {p.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-zinc-900 shadow-sm sm:right-5 sm:top-5 sm:gap-1.5 sm:rounded-full sm:px-2.5 sm:py-1 sm:text-[11px] sm:font-semibold">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                  </span>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="absolute right-4 bottom-3 grid h-11 w-11 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-2 w-2 rounded-full ${highlightStyle[p.category] ?? "bg-zinc-900"}`} />
                  <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">{p.category}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                  {p.tags.map((t) => (
                    <span key={t} className="whitespace-nowrap shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-3 hidden flex-nowrap gap-1.5 overflow-hidden lg:flex">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="whitespace-nowrap shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 2 && (
                    <span className="whitespace-nowrap shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800">+{p.tags.length - 2}</span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{p.title}</h3>
                <p className="mt-2 line-clamp-3 min-h-[4.5rem] flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-700">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> View on GitHub
                  </a>
                  {p.live && (
                    p.live.endsWith(".pdf") ? (
                      <button
                        onClick={() => setPdfSrc(p.live!)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold cursor-pointer transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                      >
                        {p.title === "Wine Data Mining" || p.title === "Airline Regression" ? "Report ↗" : "Slides ↗"}
                      </button>
                    ) : p.live.endsWith(".jpg") || p.live.endsWith(".jpeg") || p.live.endsWith(".png") || p.live.endsWith(".webp") ? (
                      <button
                        onClick={() => setImageSrc(p.live!)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold cursor-pointer transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                      >
                        Certificate ↗
                      </button>
                    ) : (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold cursor-pointer transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                      >
                        {p.live.includes("figma.com") ? "Figma Demo ↗" : p.live.includes("officeapps.live.com") || p.live.includes("docs.google.com") ? "Preview ↗" : "Live ↗"}
                      </a>
                    )
                  )}
                  {p.video && (
                    <button
                      onClick={() => setVideoSrc(p.video!)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold cursor-pointer transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                    >
                      Video ▶
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
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
            {showAll ? "Show less ↑" : `Show all ${gridFiltered.length} projects (${hiddenCount} more) ↓`}
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

      <p className="mt-8 text-center">
        <a
          href="https://github.com/jacobconradquendangan-portfolio/My-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline underline-offset-4"
        >
          View everything on GitHub →
        </a>
      </p>
    </section>
  );
}
