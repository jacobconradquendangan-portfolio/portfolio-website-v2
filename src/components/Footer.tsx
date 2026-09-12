import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

const marquee = ["Python", "Machine Learning", "Power BI", "Next.js", "TypeScript", "SQL", "Figma", "Firebase", "Selenium", "Tailwind"];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-black/[.07] dark:border-white/[.08]">
      <div className="mask-fade-x overflow-hidden py-5 opacity-60">
        <div className="animate-marquee flex w-max gap-8 font-mono text-xs uppercase tracking-[0.2em]">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-8">
              {m} <span className="text-fuchsia-500">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-8 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name} — crafted with care.</p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs">Next.js + Tailwind + Motion</span>
          <a href="#top" aria-label="Back to top" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 transition hover:-translate-y-0.5 hover:shadow dark:border-white/15">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
