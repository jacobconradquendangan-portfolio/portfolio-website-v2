import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="relative h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10">
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/40" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#fafafa] font-sans text-slate-900 dark:bg-slate-900 dark:text-zinc-50">
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Certifications />
      <Divider />
      <Contact />
    </div>
  );
}
