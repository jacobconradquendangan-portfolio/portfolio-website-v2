import { Trophy, Database, PenTool, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";

const values = [
  { icon: Trophy, title: "Award-winning", copy: "1st Place Industry Choice, 2nd Place Hackathon, Highest Sales Award." },
  { icon: Database, title: "Data-driven", copy: "ML classifiers at 92% accuracy, Power BI suites, SQL architectures." },
  { icon: PenTool, title: "Design-led", copy: "Advanced Figma, UX research, and prototypes that win stakeholders." },
  { icon: Rocket, title: "Full-cycle", copy: "From SRS docs and UML blueprints to shipped apps and .apks." },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        eyebrow="About"
        title="From classroom to production"
        copy="I'm Jacob — 16+ documented projects deep, from a 1st-place Industry Choice transit platform to a 92%-accuracy ML classifier. I've led tech teams, spoken at 5+ conferences, and I treat every build like it has real users. Currently open to internships where I can do the same."
      />
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/[.07] dark:border-white/[.09] dark:bg-white/[.03]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{v.copy}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
