"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, TrendingUp } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import { projects, projectCategories } from "@/data/portfolio";

export default function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        eyebrow="Selected work"
        title={`${projects.length} projects, 3 tracks`}
        copy="Industry awards, systems architecture, and data analytics — every project documented on GitHub."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === c
                ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-black"
                : "border border-black/10 text-zinc-600 hover:bg-black/[.05] dark:border-white/15 dark:text-zinc-400 dark:hover:bg-white/[.07]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, idx) => (
            <motion.article
              layout
              key={p.title}
              initial={mounted ? { opacity: 0, scale: 0.94 } : false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[.07] bg-white dark:border-white/[.09] dark:bg-slate-900"
            >
              <div className={`relative h-48 overflow-hidden ${p.image ? "bg-black" : `bg-gradient-to-br ${p.gradient}`} p-5`}>
                {p.image ? (
                  <>
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority={idx < 2} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </>
                ) : (
                  <div className="bg-grid absolute inset-0 opacity-40" />
                )}
                <span className="relative inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <TrendingUp className="h-3.5 w-3.5" /> {p.highlight}
                </span>
                {p.featured && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-black">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
                  </span>
                )}
                <span className="absolute bottom-3 left-5 rounded-full bg-black/25 px-2.5 py-0.5 font-mono text-[11px] text-white/90 backdrop-blur">
                  {p.category}
                </span>
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
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-black/[.05] px-2.5 py-1 text-xs font-medium dark:bg-white/[.07]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black dark:hover:text-white"
                  >
                    <GithubIcon className="h-4 w-4" /> View on GitHub →
                  </a>
                  {p.live && (
                    p.live.endsWith(".pdf") ? (
                      <button
                        onClick={() => setPdfSrc(p.live!)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                      >
                        {p.title === "Wine Data Mining" ? "Report ↗" : "Slides ↗"}
                      </button>
                    ) : (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
                      >
                        {p.live.includes("figma.com") ? "Figma Demo ↗" : p.live.endsWith(".jpg") || p.live.endsWith(".jpeg") || p.live.endsWith(".png") ? "Certificate ↗" : p.live.includes("officeapps.live.com") || p.live.includes("docs.google.com") ? "Preview ↗" : "Live ↗"}
                      </a>
                    )
                  )}
                  {p.video && (
                    <button
                      onClick={() => setVideoSrc(p.video!)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium transition hover:border-violet-300 hover:text-violet-600 dark:border-white/15 dark:bg-transparent"
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
                <a href={videoSrc} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Open raw ↗</a>
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
                <span className="font-medium">{pdfSrc?.includes("Datamining_Final_Report") ? "Wine Quality — Report" : "Hotel Management SAD — Slides"}</span>
                <div className="flex items-center gap-2">
                  <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black hover:bg-zinc-100">Open raw ↗</a>
                  <button onClick={() => setPdfSrc(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">✕</button>
                </div>
              </div>
              <iframe src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfSrc)}`} title="Slides" className="h-full w-full flex-1 border-0" />
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
