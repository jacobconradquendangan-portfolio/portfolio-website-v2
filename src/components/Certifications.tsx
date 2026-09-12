"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Users, BadgeCheck, Bot } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";
import { GithubIcon } from "./icons";
import { certifications } from "@/data/portfolio";

const icons = [Award, Users, BadgeCheck, Bot];

export default function Certifications() {
  const [pdf, setPdf] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[] | null>(null);
  const activeTitle = gallery ? certifications.find((c) => (c as any).gallery === gallery)?.title ?? "Certificates" : pdf ? certifications.find((c) => (c as any).pdf === pdf)?.title ?? "Certificate" : "";

  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & leadership"
        copy="Professional certifications and Tech Lead roles across 5+ major conferences."
      />
      <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {certifications.map((c, i) => {
          const Icon = icons[i % icons.length];
          const certPdf = (c as any).pdf as string | undefined;
          const certGallery = (c as any).gallery as string[] | undefined;
          return (
            <StaggerItem key={c.title}>
              <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/[.09] dark:bg-slate-900">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {c.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {certGallery ? (
                    <button
                      onClick={() => setGallery(certGallery)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black dark:hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" /> View certificates →
                    </button>
                  ) : certPdf ? (
                    <button
                      onClick={() => setPdf(certPdf)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black dark:hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" /> View certificate →
                    </button>
                  ) : (
                    <a
                      href={c.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black dark:hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" /> View credentials →
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <AnimatePresence>
        {pdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex h-[85vh] w-[95%] max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-slate-900 px-4 py-3 text-sm text-white">
                <span className="truncate font-medium">{activeTitle} — Certificate</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPdf(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">✕</button>
                </div>
              </div>
              {pdf?.match(/\.(png|jpg|jpeg|webp)$/i) ? (
                <div className="flex flex-1 items-center justify-center overflow-auto bg-zinc-100 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pdf} alt={activeTitle} className="max-h-full max-w-full object-contain shadow-lg" />
                </div>
              ) : (
                <iframe src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdf!)}`} title={activeTitle} className="h-full w-full flex-1 border-0" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setGallery(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex h-[85vh] w-[95%] max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-slate-900 px-4 py-3 text-sm text-white">
                <span className="truncate font-medium">{activeTitle} — Certificates (2)</span>
                <button onClick={() => setGallery(null)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">✕</button>
              </div>
              <div className="grid flex-1 gap-4 overflow-auto bg-zinc-100 p-4 sm:grid-cols-2">
                {gallery.map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={activeTitle} className="h-full w-full object-contain" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
