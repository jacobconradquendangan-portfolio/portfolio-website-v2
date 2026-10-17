"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/portfolio";

export default function ClickCard({
  project,
  mounted,
  onVideo,
  onPdf,
  onImage,
}: {
  project: Project & { gradient: string };
  mounted: boolean;
  onVideo: (src: string) => void;
  onPdf: (src: string) => void;
  onImage: (src: string) => void;
}) {
  const [showTags, setShowTags] = useState(false);

  const handleSecondary = () => {
    if (!project.live) return;
    if (project.live.endsWith(".pdf")) return onPdf(project.live);
    if (project.live.match(/\.(jpg|jpeg|png|webp)$/)) return onImage(project.live);
    window.open(project.live, "_blank", "noopener,noreferrer");
  };

  const secondaryLabel = project.live
    ? project.live.includes("figma.com")
      ? "Figma Demo"
      : project.live.includes("officeapps.live.com") || project.live.includes("docs.google.com")
        ? "Preview"
        : project.live.endsWith(".pdf")
          ? project.title === "Wine Data Mining" || project.title === "Airline Regression"
            ? "Report"
            : "Slides"
          : project.live.match(/\.(jpg|jpeg|png|webp)$/)
            ? "Certificate"
            : "Live"
    : null;

  return (
    <motion.article
      layout
      initial={mounted ? { opacity: 0, scale: 0.94 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      className="group relative mx-auto flex h-full w-full max-w-none flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900/80 backdrop-blur-sm text-gray-50 shadow-md shadow-black/[.04] transition-shadow duration-300 hover:shadow-lg hover:shadow-black/10 dark:shadow-black/20 dark:hover:shadow-black/30 md:max-w-[352px]"
    >
      <div className="before:duration-700 relative z-10 flex h-full flex-col justify-between before:absolute before:-left-4 before:-top-12 before:h-28 before:w-28 before:rounded-full before:border-8 before:border-white/20 before:bg-transparent before:blur-none group-hover:before:left-44 group-hover:before:top-28 group-hover:before:scale-125 group-hover:before:blur">
        {project.image && (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {project.featured && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-zinc-900 shadow-sm sm:right-5 sm:top-5 sm:gap-1.5 sm:rounded-full sm:px-2.5 sm:py-1 sm:text-[11px] sm:font-semibold">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
          </div>
        )}
        <div
          className="flex flex-1 cursor-pointer flex-col justify-evenly p-3"
          onClick={() => setShowTags(!showTags)}
        >
          <span className="text-lg font-semibold">{project.title}</span>
          <AnimatePresence mode="wait">
            {showTags ? (
              <motion.div
                key="tags"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-1.5"
              >
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="desc"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="line-clamp-2 text-xs leading-relaxed text-gray-100/90"
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="z-10 flex w-full flex-row justify-between divide-x divide-neutral-200 border-t border-neutral-200">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="flex w-full items-center justify-center gap-1.5 bg-white py-3 text-xs font-semibold text-neutral-900 transition hover:opacity-90"
          >
            <GithubIcon className="h-4 w-4" /> View on GitHub
          </a>
          {secondaryLabel && (
            <button
              onClick={handleSecondary}
              aria-label={secondaryLabel}
              className="flex w-full items-center justify-center gap-1.5 bg-white py-3 text-xs font-semibold text-neutral-900 transition hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" /> {secondaryLabel}
            </button>
          )}
          {project.video && (
            <button
              onClick={() => onVideo(project.video!)}
              aria-label="Video"
              className="flex w-full items-center justify-center gap-1.5 bg-white py-3 text-xs font-semibold text-neutral-900 transition hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M5 3l14 9-14 9V3z" strokeWidth="2" strokeLinejoin="round" fill="none" />
              </svg>
              Video
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
