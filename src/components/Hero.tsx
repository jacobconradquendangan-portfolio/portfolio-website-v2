"use client";

import { motion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.65, 0.16, 1] as const } },
};

export default function Hero() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="animate-blob absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet-500/25 blur-[100px]" />
        <div className="animate-blob absolute top-10 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[100px] [animation-delay:-6s]" />
        <div className="animate-blob absolute top-40 left-1/2 h-56 w-56 rounded-full bg-orange-400/20 blur-[90px] [animation-delay:-12s]" />
      </div>

      <motion.div
        variants={container}
        initial={mounted ? "hidden" : false}
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-14 sm:pt-24 lg:grid-cols-[1.4fr_1fr] lg:items-center"
      >
        <div>
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 py-1 pr-4 pl-1.5 text-xs font-medium shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/[.06]">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                <Sparkles className="h-3 w-3" /> New
              </span>
              {profile.availability}
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center gap-5">
            <h1 className="flex-1 text-5xl leading-[1.02] font-bold tracking-[-0.03em] sm:text-7xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                Jacob!
              </span>
            </h1>
            <div className="shrink-0 lg:hidden">
              {photoOk ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={160}
                  height={160}
                  onError={() => setPhotoOk(false)}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-xl dark:border-zinc-800"
                />
              ) : (
                <span className="grid h-20 w-20 place-items-center rounded-full border-4 border-white text-lg font-bold text-white shadow-xl dark:border-zinc-800" style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}>
                  JC
                </span>
              )}
            </div>
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4" /> {profile.location}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.a
              href={profile.links.cvBuilder}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              <Star className="h-4 w-4 fill-white/90" /> CV Builder — Live
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/15 transition hover:shadow-2xl dark:bg-white dark:text-black"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-6 dark:border-white/[.1]">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs leading-4 text-zinc-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 40, rotate: 2 } : false}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative hidden w-full max-w-md justify-self-center lg:block"
        >
          <div className="animate-float relative rounded-3xl border border-slate-200 bg-white/80 p-3 shadow-2xl backdrop-blur-xl dark:border-white/[.12] dark:bg-slate-900/70">
            <div className="animate-float absolute -top-12 -right-6 z-10 [animation-delay:-2.5s]">
              {photoOk ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={160}
                  height={160}
                  onError={() => setPhotoOk(false)}
                  className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-2xl dark:border-zinc-800"
                />
              ) : (
                <span className="grid h-32 w-32 place-items-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-2xl dark:border-zinc-800" style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)" }}>
                  JC
                </span>
              )}
            </div>
            <div className="rounded-2xl bg-slate-900 p-7 pt-9 font-mono text-[15px] leading-8 text-zinc-300 dark:bg-black">
              <div className="mb-4 flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <p><span className="text-fuchsia-400">const</span> <span className="text-sky-300">jacob</span> = {"{"}</p>
              <p className="pl-4">stack: [<span className="text-amber-200">&apos;Python&apos;</span>, <span className="text-amber-200">&apos;Next.js&apos;</span>],</p>
              <p className="pl-4">focus: <span className="text-amber-200">&apos;data + UX&apos;</span>,</p>
              <p className="pl-4">awards: <span className="text-emerald-300">3</span>,</p>
              <p className="pl-4">openToWork: <span className="text-emerald-300">true</span> <span className="animate-pulse">▍</span></p>
              <p>{"}"}</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold">{profile.name}</p>
                <p className="truncate text-sm text-zinc-500">IS Student • Agentic AI</p>
              </div>
              <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-500"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Award-winning</span>
            </div>
          </div>

          <motion.a
            href="https://github.com/jacobconradquendangan-portfolio/My-Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-float-slow absolute top-8 -left-5 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm font-medium whitespace-nowrap shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90"
          >
            <GithubIcon className="h-4 w-4" /> 16+ projects
          </motion.a>
          <motion.div className="animate-float absolute -right-3 -bottom-5 flex items-center gap-2 rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm font-medium whitespace-nowrap shadow-xl backdrop-blur [animation-delay:-3s] dark:border-white/10 dark:bg-slate-900/90">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Agentic AI explorer
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`.findme-link{position:relative;overflow:hidden}.findme-link::before{content:"";position:absolute;inset:0;border-radius:9999px;background:linear-gradient(135deg,#8b5cf6,#ec4899,#f97316);opacity:0;transition:opacity .3s;z-index:0}.findme-link:hover::before{opacity:1}.findme-link:hover{color:#fff!important;box-shadow:0 8px 24px rgb(124 58 237 / .28)!important;transform:translateY(-2px) scale(1.04)}.findme-link:active{transform:translateY(0) scale(.98)!important}.findme-link>svg,.findme-link>span{position:relative;z-index:1}@media(prefers-color-scheme:dark){.findme-link:hover{color:#fff!important}}`}</style>
      <div className="border-y border-slate-200 bg-black/[.02] dark:border-white/[.06] dark:bg-white/[.02]">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3 text-sm font-medium text-zinc-500">
          <span className="font-mono text-xs uppercase tracking-widest">Find me</span>
          <motion.a href={profile.socials.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="findme-link group inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 backdrop-blur transition-colors duration-200 hover:border-transparent hover:text-white dark:border-white/15 dark:bg-white/[.06]">
            <GithubIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" /> <span className="relative z-[1]">GitHub</span>
          </motion.a>
          <motion.a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="findme-link group inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 backdrop-blur transition-colors duration-200 hover:border-transparent hover:text-white dark:border-white/15 dark:bg-white/[.06]">
            <LinkedinIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" /> <span className="relative z-[1]">LinkedIn</span>
          </motion.a>
          <motion.a href={`mailto:${profile.email}`} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="findme-link group inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 backdrop-blur transition-colors duration-200 hover:border-transparent hover:text-white dark:border-white/15 dark:bg-white/[.06]">
            <span className="relative z-[1]">Email</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
