import { Code2, BarChart3, Globe, Palette, Database, Wrench } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";
import { skills } from "@/data/portfolio";

const icons: Record<string, typeof Code2> = {
  code: Code2,
  chart: BarChart3,
  globe: Globe,
  palette: Palette,
  database: Database,
  tools: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-slate-200 bg-black/[.02] dark:border-white/[.06] dark:bg-white/[.02]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Skills"
          title="Technical toolkit"
          copy="Technologies and tools I use to turn data into decisions and ideas into interfaces."
        />
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-900/30 dark:text-indigo-300">6 domains</span>
          <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-zinc-600 dark:border-white/15 dark:bg-white/[.06] dark:text-zinc-400">{skills.reduce((n, g) => n + g.items.length, 0)} technologies</span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-900/30 dark:text-emerald-300 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Agentic AI in progress</span>
        </div>
        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => {
            const Icon = icons[g.icon] ?? Code2;
            return (
              <StaggerItem key={g.category}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-white/[.09] dark:bg-slate-900">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-white shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:rotate-1">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-tight">{g.category}</h3>
                      <p className="mt-0.5 text-xs leading-4 text-zinc-500">{g.description}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex-1 border-t border-slate-200 pt-4 dark:border-white/[.08]">
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 rounded-full bg-black/[.05] px-3 py-1 text-xs font-medium transition hover:bg-black/[.09] dark:bg-white/[.07] dark:hover:bg-white/[.12]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 group-hover:bg-violet-400 transition-colors" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end pt-3 text-xs text-zinc-400">
                    <span>{g.items.length} tools</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
