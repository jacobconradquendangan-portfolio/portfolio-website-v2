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
    <section id="skills" className="scroll-mt-24 border-y border-zinc-100 bg-white dark:border-white/[.06] dark:bg-white/[.02]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Skills"
          title="Technical toolkit"
          copy="Technologies and tools I use to turn data into decisions and ideas into interfaces."
        />
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">6 domains</span>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">{skills.reduce((n, g) => n + g.items.length, 0)} technologies</span>
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-pulse" /> Agentic AI in progress</span>
        </div>

        <Stagger className="mt-10 divide-y divide-zinc-100 border-y border-zinc-100 dark:divide-zinc-800 dark:border-zinc-800">
          {skills.map((g) => {
            const Icon = icons[g.icon] ?? Code2;
            return (
              <StaggerItem key={g.category}>
                <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4 sm:min-w-[260px]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold leading-tight text-zinc-900 dark:text-zinc-100">{g.category}</h3>
                      <p className="mt-0.5 text-xs leading-4 text-zinc-500">{g.description}</p>
                      <p className="mt-1 text-xs text-zinc-400">{g.items.length} tools</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:max-w-[60%] sm:justify-end">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
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
