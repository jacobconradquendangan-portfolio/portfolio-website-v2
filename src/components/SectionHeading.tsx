import { Reveal } from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal>
      <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:border-white/15 dark:bg-white/[.04] dark:text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {copy ? (
        <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">{copy}</p>
      ) : null}
    </Reveal>
  );
}
