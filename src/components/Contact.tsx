"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* noop */ }
  };

  const channels = [
    {
      name: "GitHub",
      detail: `${profile.stats.find((s) => s.label.includes("Projects"))?.value ?? "16+"} projects & source code`,
      href: profile.socials.github,
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      detail: "Connect professionally",
      href: profile.socials.linkedin,
      icon: LinkedinIcon,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,black,transparent)] opacity-60" />
        <div className="absolute -bottom-24 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/25 via-fuchsia-500/25 to-orange-400/25 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Have an idea? Let's make it real."
          copy="My inbox is always open — whether it's an internship, a collaboration, or just a good conversation about data and AI."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="h-full">
            <div className="h-full rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 p-[1.5px] shadow-2xl shadow-fuchsia-500/10">
              <div className="flex h-full flex-col justify-between rounded-lg bg-slate-900 p-8 text-white sm:p-10 dark:bg-black">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {profile.availability}
                  </span>

                  <a
                    href={`mailto:${profile.email}`}
                    className="group mt-6 block text-lg font-bold tracking-tight break-all transition sm:text-xl"
                  >
                    {profile.email}
                    <ArrowUpRight className="ml-2 inline h-5 w-5 text-zinc-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </a>

                  <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-400">
                    <MapPin className="h-4 w-4" /> {profile.location} • replies within 24h on business days
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                  <motion.a
                    href={`mailto:${profile.email}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    <Mail className="h-4 w-4" /> Write me
                  </motion.a>
                  <motion.button
                    onClick={copyEmail}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium transition hover:bg-white/10"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied to clipboard!" : "Copy email"}
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>

          <Stagger className="flex flex-col gap-5" delay={0.1}>
            {channels.map((c) => (
              <StaggerItem key={c.name} className="flex-1">
                <motion.a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex h-full items-center gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-white/[.09] dark:bg-slate-900"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-slate-900 text-white transition-transform group-hover:scale-105 dark:bg-white dark:text-black">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{c.name}</span>
                    <span className="block truncate text-sm text-zinc-500">{c.detail}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black dark:group-hover:text-white" />
                </motion.a>
              </StaggerItem>
            ))}

            <StaggerItem className="flex-1">
              <div className="flex h-full items-center gap-4 rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 p-6 text-white shadow-xl shadow-fuchsia-500/20">
                <span className="text-3xl font-bold">3+</span>
                <p className="text-sm leading-5 opacity-90">
                  years turning coursework into award-winning, shipped work
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
