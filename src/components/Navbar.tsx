"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["about", "skills", "projects", "certifications", "contact"];
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setOpen(false);
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      }, 80);
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/75 backdrop-blur-xl dark:border-white/[.08] dark:bg-slate-900/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 font-mono text-[13px] font-bold text-white transition-transform group-hover:rotate-6 dark:bg-white dark:text-black">
            JC
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            jacob.dev
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/60 p-1 backdrop-blur md:flex dark:border-white/[.1] dark:bg-white/[.04]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              aria-current={active === l.href ? "true" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === l.href
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                  : "text-zinc-600 hover:bg-black/[.06] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span
            title="CV is being updated — check back soon"
            aria-label="CV updating"
            className="group hidden cursor-not-allowed items-center gap-1.5 rounded-full bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-white/80 sm:inline-flex"
          >
            CV — Updating
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          </span>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-black/10 md:hidden dark:border-white/15"
          >
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.18, ease: [0.21, 0.65, 0.16, 1] }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/10 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.32, ease: [0.21, 0.65, 0.16, 1] }}
              className="absolute left-0 right-0 top-full overflow-hidden border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-xl md:hidden dark:border-white/[.08] dark:bg-slate-900/95"
            >
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
                className="space-y-1 px-6 py-4"
              >
                {links.map((l) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleNav(e, l.href)}
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.21, 0.65, 0.16, 1] } } }}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active === l.href
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/[.06]"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
