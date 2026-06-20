/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  FileCheck,
  Heart,
  Layers,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import { FUNDING_NEEDS, PROJECTS_DATA } from "./data";
import MethodGrid from "./components/MethodGrid";
import ProjectCard from "./components/ProjectCard";

const emailAddress = "haringcody@gmail.com";

const proofStats = [
  {
    label: "Public demos",
    value: "2 live",
    detail: "Bone League and Feral Formation are linked for direct browser play.",
  },
  {
    label: "Native game proof",
    value: "Android + C++",
    detail: "Savage Crown is advancing through JNI, device, and CI-backed checks.",
  },
  {
    label: "Production memory",
    value: "Receipt-backed",
    detail: "Local Lab records track validation, direction, gates, and project drift.",
  },
];

const studioSignals = [
  "Creator-owned multimedia studio",
  "Systems-heavy games first",
  "AI-assisted production, human direction",
  "Private Lab workflow, public proof only",
];

const labMethod = [
  {
    title: "Receipts over vibes",
    copy: "Completed gates leave durable proof: what changed, where it changed, and how it was validated.",
    icon: FileCheck,
  },
  {
    title: "Project arenas",
    copy: "Each game stays in its own repo while the Lab tracks direction, memory, and validation pressure.",
    icon: Layers,
  },
  {
    title: "No secret leakage",
    copy: "The Lab is private operating infrastructure. The public site shows outcomes, not internal keys or raw machinery.",
    icon: Shield,
  },
  {
    title: "Buildable weirdness",
    copy: "AI handles leverage work like code, audits, docs, and iteration speed. Taste and final calls stay human.",
    icon: Sparkles,
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionKicker({ children }: { children: string }) {
  return (
    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-amber-400">
      {children}
    </span>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060607] text-zinc-300 antialiased selection:bg-amber-400 selection:text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-900/90 bg-[#060607]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-left"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-amber-400 transition-colors group-hover:border-amber-500/70">
              <Activity size={18} strokeWidth={2.5} />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span>
              <span className="block font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                Ultramonkeydog
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                Studios
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 md:flex">
            <button onClick={() => scrollToSection("proof")} className="transition-colors hover:text-white">Proof</button>
            <button onClick={() => scrollToSection("slate")} className="transition-colors hover:text-white">Slate</button>
            <button onClick={() => scrollToSection("method")} className="transition-colors hover:text-white">Method</button>
            <button onClick={() => scrollToSection("support")} className="transition-colors hover:text-white">Support</button>
          </nav>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-200 transition-colors hover:border-amber-400 hover:text-white"
          >
            <Mail size={12} />
            Contact
          </button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-zinc-900">
          <img
            src="/assets/studio-forge-hero.png"
            alt="Dark game production workstation with creature diagrams, tactical screens, and studio tools"
            className="absolute inset-0 h-full w-full object-cover opacity-58"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,7,0.96)_0%,rgba(6,6,7,0.76)_42%,rgba(6,6,7,0.38)_74%,rgba(6,6,7,0.78)_100%)]" />
          <div className="absolute inset-0 bg-grid-ambient opacity-25" />

          <div className="relative mx-auto grid min-h-[78svh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-4xl lg:col-span-8"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded border border-amber-500/30 bg-zinc-950/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Updated public studio signal - June 2026
              </div>

              <h1 className="font-display text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Ultramonkeydog Studios
              </h1>

              <p className="mt-6 max-w-3xl font-display text-xl font-medium leading-snug text-zinc-100 sm:text-2xl">
                Strange games. Deep systems. AI-assisted production. Human taste at the wheel.
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-350 sm:text-base">
                A creator-owned multimedia forge building creature RPGs, tactical roguelites, native mobile systems, and dark digital worlds. The private Ultramonkeydog Lab powers the workflow; this site shows the public proof.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection("slate")}
                  className="inline-flex items-center justify-center gap-2 rounded bg-zinc-100 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-950 transition-colors hover:bg-white"
                >
                  Enter the slate
                  <ChevronRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("proof")}
                  className="inline-flex items-center justify-center gap-2 rounded border border-zinc-700 bg-zinc-950/70 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition-colors hover:border-amber-400 hover:text-white"
                >
                  See current proof
                  <ArrowUpRight size={15} />
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {studioSignals.map((signal) => (
                  <span key={signal} className="rounded border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                    {signal}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="proof" className="border-b border-zinc-900 bg-[#09090b] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <SectionKicker>Current proof</SectionKicker>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                Not just a pitch deck.
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                The studio now has playable browser demos, a native Android engine track, and a private Lab workflow that records receipts instead of relying on chat memory.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded border border-zinc-900 bg-zinc-950 p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <p className="mt-3 font-display text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-3 text-xs leading-6 text-zinc-450">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <a
                href="https://bone-league-black-bracket-604506170438.us-east1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded border border-sky-900/50 bg-sky-950/10 p-5 transition-colors hover:border-sky-400/70"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-sky-300">Playable now</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">Bone League: Black Bracket</h3>
                  </div>
                  <ExternalLink className="text-sky-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">Sports horror management roguelite with draft pressure, procedural seasons, simulation math, and match reports.</p>
              </a>

              <a
                href="https://feral-formation-604506170438.us-east1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded border border-violet-900/50 bg-violet-950/10 p-5 transition-colors hover:border-violet-400/70"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-violet-300">Playable now</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">Feral Formation</h3>
                  </div>
                  <ExternalLink className="text-violet-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} />
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">Tactical creature-party roguelite with deterministic combat, formation strategy, clash windows, and persistent mastery.</p>
              </a>
            </div>
          </div>
        </section>

        <section id="slate" className="bg-[#070708] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <SectionKicker>Project slate</SectionKicker>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                  Games are the current proof engine.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-zinc-400">
                Each project explores a different edge of the studio identity: creature growth, tactical pressure, native mobile mutation systems, and sensory-aware family design.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {PROJECTS_DATA.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="border-y border-zinc-900 bg-[#0a0a0c] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionKicker>Lab-assisted production</SectionKicker>
                <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                  The Lab is the private operating system.
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  Ultramonkeydog Lab is the local command organism used to route projects, preserve memory, validate builds, and turn scattered creative direction into executable work. It is not shipped inside the public games or this website.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:col-span-7">
                {labMethod.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded border border-zinc-900 bg-zinc-950 p-5">
                      <Icon size={18} className="text-amber-400" />
                      <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-zinc-450">{item.copy}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-16">
              <div className="mb-8 max-w-3xl">
                <SectionKicker>Production roles</SectionKicker>
                <h3 className="mt-3 font-display text-2xl font-black tracking-tight text-white sm:text-4xl">
                  AI is leverage. Cody is the taste filter.
                </h3>
              </div>
              <MethodGrid />
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-900 bg-[#080809] py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-4">
              <div className="rounded border border-amber-900/40 bg-amber-950/10 p-6">
                <Heart size={22} className="text-amber-300" />
                <h2 className="mt-5 font-display text-2xl font-black tracking-tight text-white">
                  Built by Cody Haring
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Self-taught creator, studio director, systems designer, and final authority for the worlds, mechanics, tone, and public identity of Ultramonkeydog Studios.
                </p>
              </div>
            </div>
            <div className="space-y-5 text-sm leading-7 text-zinc-400 lg:col-span-8">
              <SectionKicker>Founder signal</SectionKicker>
              <p className="font-display text-2xl font-semibold leading-snug text-zinc-100">
                The goal is to make original games that feel like they came from a person, not a template.
              </p>
              <p>
                The studio pulls from creature obsession, RPG progression, horror energy, anime and manga influence, metal and underground music taste, mobile-first design constraints, and a stubborn preference for systems that have math under the surface.
              </p>
              <p>
                Saga of an Anxious Fluff carries a dedicated family-facing branch of that work: colorful, sensory-aware, and accessible without becoming shallow.
              </p>
            </div>
          </div>
        </section>

        <section id="support" className="bg-[#070708] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <SectionKicker>Partnership readiness</SectionKicker>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
                Support turns proof into production capacity.
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Ultramonkeydog Studios is seeking practical support for hardware, tools, original assets, demo polish, and public-facing materials.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FUNDING_NEEDS.map((need, index) => (
                <div key={need.title} className="rounded border border-zinc-900 bg-zinc-950 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                      {need.urgency}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-700">REQ_{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{need.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-zinc-450">{need.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-zinc-900 bg-[#040405] py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <SectionKicker>Contact</SectionKicker>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
              Talk to Ultramonkeydog Studios
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              For funding, collaboration, incubator, grant, playtest, or project inquiries, contact Cody directly.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-zinc-100 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-950 transition-colors hover:bg-white sm:w-auto"
              >
                <Mail size={15} />
                Email Cody
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-6 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-100 transition-colors hover:border-amber-400 sm:w-auto"
              >
                {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 bg-[#030304] py-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
          <span>© {currentYear} Ultramonkeydog Studios</span>
          <span>Creator-owned. AI-assisted. Human-directed.</span>
        </div>
      </footer>
    </div>
  );
}
