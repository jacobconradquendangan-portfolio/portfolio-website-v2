import { Award, Users, BadgeCheck, Bot } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";
import { GithubIcon } from "./icons";
import { certifications } from "@/data/portfolio";

const icons = [Award, Users, BadgeCheck, Bot];

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & leadership"
        copy="Professional certifications and Tech Lead roles across 5+ major conferences."
      />
      <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
        {certifications.map((c, i) => {
          const Icon = icons[i % icons.length];
          return (
            <StaggerItem key={c.title}>
              <div className="group h-full rounded-3xl border border-black/[.07] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/[.09] dark:bg-slate-900">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {c.description}
                </p>
                <a
                  href={c.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black dark:hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" /> View credentials →
                </a>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
