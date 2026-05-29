/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Mail, 
  ChevronRight, 
  Heart, 
  FileCheck, 
  Copy, 
  Check, 
  ArrowUpRight,
  Shield,
  Layers,
  Cpu,
  Bookmark,
  ExternalLink,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { PROJECTS_DATA, FUNDING_NEEDS } from "./data";
import ProjectCard from "./components/ProjectCard";
import MethodGrid from "./components/MethodGrid";

export default function App() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "haringcody@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  // Scroll handler for clean anchor jumps
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="website-root" className="min-h-screen bg-[#060608] text-zinc-300 flex flex-col relative antialiased selection:bg-zinc-800 selection:text-white">
      
      {/* Background ambient grid design representing digital blueprint space */}
      <div className="absolute inset-0 bg-grid-ambient pointer-events-none opacity-40" />
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#111015]/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-950/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-950/5 blur-[130px] pointer-events-none" />

      {/* HEADER / NAVIGATION BAR */}
      <header id="app-header" className="sticky top-0 z-50 bg-[#060608]/90 backdrop-blur-md border-b border-zinc-900 transition-all font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* Visual branding logomark with terminal node feel */}
            <div className="w-9 h-9 rounded bg-zinc-950 border border-zinc-850 flex items-center justify-center p-1.5 group-hover:border-zinc-700 transition-all duration-300 relative overflow-hidden">
              <svg className="w-full h-full text-zinc-400 group-hover:text-amber-400 transition-colors duration-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10">
                <circle cx="50" cy="50" r="32" strokeDasharray="25 15" />
                <path d="M 28 50 L 72 50 M 50 28 L 50 72" />
              </svg>
              <div className="absolute top-0 right-0 w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-zinc-100 group-hover:text-white transition-colors">
                ULTRAMONKEYDOG
              </span>
              <span className="text-[9px] font-mono block text-zinc-500 tracking-widest mt-[-1px] group-hover:text-zinc-300 transition-colors">
                CREATIVE SLATE DIRECTORY
              </span>
            </div>
          </div>

          {/* Quick Jump Anchors */}
          <nav id="headline-nav" className="hidden md:flex items-center gap-5 text-[10px] font-mono text-zinc-500">
            <button onClick={() => scrollToSection("vision")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">The Mission</button>
            <button onClick={() => scrollToSection("slate")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">Game Lineup</button>
            <button onClick={() => scrollToSection("playable-proof")} className="text-amber-500 hover:text-amber-400 transition-colors cursor-pointer uppercase tracking-wider font-bold">Playable Proof</button>
            <button onClick={() => scrollToSection("fluff-dedication")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">Fluff Dedication</button>
            <button onClick={() => scrollToSection("workflows")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">AI Production</button>
            <button onClick={() => scrollToSection("founder-bio")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">The Founder</button>
            <button onClick={() => scrollToSection("pipeline")} className="hover:text-zinc-200 transition-colors cursor-pointer uppercase tracking-wider font-semibold font-medium">Partnerships</button>
          </nav>

          {/* Contact Fast-Track */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection("contact-node")}
              className="text-[10px] font-mono border-2 border-zinc-800 hover:border-zinc-300 bg-zinc-950 px-4 py-2 rounded font-bold cursor-pointer transition-all flex items-center gap-1.5 hover:text-white"
            >
              <Mail size={11} className="text-zinc-500 group-hover:text-white" />
              <span>ENGAGE</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className="flex-grow">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 flex flex-col items-center text-center relative font-sans overflow-hidden">
          
          {/* Top subtle HUD badge banner */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-850 text-amber-500 text-[10px] font-mono rounded mb-8 tracking-widest uppercase font-semibold relative overflow-hidden"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            CREATOR-OWNED MULTIMEDIA FORGE 2026
          </motion.div>

          {/* Main Title Typography with epic game poster size & contrast */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white mb-2 select-text"
          >
            Ultramonkeydog Studios
          </motion.h1>

          {/* Creative Swag Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-lg sm:text-xl md:text-2xl font-medium text-amber-450 max-w-4xl mb-8 tracking-normal px-4 leading-snug"
          >
            Strange games. Deep systems. AI-assisted production. Human taste at the wheel.
          </motion.p>

          {/* Body Block */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-zinc-400 text-xs sm:text-base leading-relaxed max-w-3xl mb-12 px-4 shadow-black"
          >
            Ultramonkeydog Studios is a creator-owned multimedia forge. Interactive games and deep systems are our current proof engine, but our long-term ambition scales into broader weird media, horror, writing, and strange digital universes. We use AI to bridge production gaps—but the soul, the horror, the math, and the weirdness are entirely human.
          </motion.p>

          {/* Call to Actions (CTAs) with heavy-border gaming arcade feels */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md px-4"
          >
            <button 
              onClick={() => scrollToSection("slate")} 
              className="w-full sm:w-auto cursor-pointer border-2 border-zinc-100 bg-zinc-100 hover:bg-white text-zinc-950 font-sans font-bold px-7 py-3.5 rounded text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_-3px_rgba(244,244,245,0.25)]"
            >
              Enter the Projects
              <ChevronRight size={14} strokeWidth={2.5} className="text-zinc-950" />
            </button>
            
            <button 
              onClick={() => scrollToSection("contact-node")} 
              className="w-full sm:w-auto cursor-pointer border-2 border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 hover:text-white font-sans font-bold px-7 py-3.5 rounded text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 hover:border-zinc-650"
            >
              Contact / Funding Inquiries
              <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-white" />
            </button>
          </motion.div>
        </section>

        {/* 2. MISSION SECTION "BUILT FROM INSTINCT" */}
        <section id="vision" className="bg-[#0b0a0d] border-y border-zinc-900/80 py-18 sm:py-24 relative font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                  CREATOR-FIRST PHILOSOPHY
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                  Built From Instinct
                </h2>
                <div className="h-1 w-12 bg-amber-500 rounded" />
              </div>

              <div className="lg:col-span-8 space-y-6">
                <p className="font-display text-lg sm:text-xl text-zinc-250 leading-relaxed font-normal">
                  Ultramonkeydog Studios is creator-driven first. These games are not designed by committee or safe genre templates. They bleed from Cody Haring’s instincts, death-metal underground taste, horror/dark fantasy influences, RPG obsession, and a love for deep, atmospheric systems that refuse to feel normal.
                </p>
                <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed">
                  <p>
                    We reject the corporate sanitization of intermediate art. Deep systems demand obsession. Creating weird, atmospheric mechanical frameworks requires looking past standard mechanics, and using production utilities like automated balance checkers and co-pilot code frameworks to bring those ideas into existence.
                  </p>
                  <p>
                    AI is part of the studio’s production method, but it is not the soul of the work. AI helps bridge gaps. It helps code, organize, test, document, and accelerate. The human creator still decides what matters.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* THE MULTIMEDIA FORGE */}
        <section id="multimedia-forge" className="py-18 sm:py-24 border-b border-zinc-900/60 relative font-sans bg-[#08080a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block font-bold">
                  BEYOND THE GAME ENGINE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  The Multimedia Forge
                </h3>
                <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed">
                  <p>
                    Interactive software is the foundation, but the vision is broader. Ultramonkeydog Studios is building toward multimedia expression across music-driven worlds, dark/anime/manga-influenced comics, horror/sci-fi writing, and interconnected digital universes.
                  </p>
                  <p>
                    Games are the current proof engine. They force us to synthesize systems, writing, art direction, and audio into aggressive, coherent packages. As our production forge matures, we are expanding our creative footprint.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 relative p-6 bg-zinc-950 border-2 border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between hover:border-zinc-850 transition-colors">
                <div className="absolute top-0 right-0 p-1 font-mono text-[9px] text-zinc-700 tracking-wider">ARSENAL_NODE</div>
                <div className="space-y-4">
                  <span className="inline-flex py-0.5 px-2 bg-zinc-900 text-zinc-405 border border-zinc-850 font-mono text-[9px] tracking-wider uppercase font-semibold rounded">CREATIVE SKILL STACK</span>
                  <div className="grid grid-cols-2 gap-3 text-zinc-400">
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">Game Systems</p></div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">Horror Tone</p></div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">Creature Design</p></div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">Music & Audio</p></div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">RPG Progression</p></div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed"><span className="text-amber-550 font-mono">/</span><p className="text-zinc-200 font-bold tracking-wide uppercase text-[10px] mt-0.5">Worldbuilding</p></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. "AI MAKES THE IMPOSSIBLE BUILDABLE" */}
        <section className="py-18 sm:py-24 border-b border-zinc-900/60 relative font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block font-bold">
                  SKILL GAP LIBERATION
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  AI is the Engine Lift, Not the Soul
                </h3>
                <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed">
                  <p>
                    Traditional game development demands money, teams, training, and industry connections. Ultramonkeydog Studios operates differently. AI is the engine lift that handles boilerplate, technical debugging, and asset drafting.
                  </p>
                  <p>
                    But AI is not the brand's soul. Cody is the director, taste filter, systems architect, and final authority. Every pixel, mechanic, and sentence is aggressively controlled by human intent. We use AI to bridge the gaps, but the weirdness and the grit are 100% human.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 relative p-6 bg-zinc-950 border-2 border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between hover:border-zinc-850 transition-colors">
                <div className="absolute top-0 right-0 p-1 font-mono text-[9px] text-zinc-700 tracking-wider">HUD_BRIDGES</div>
                <div className="space-y-4">
                  <span className="inline-flex py-0.5 px-2 bg-zinc-900 text-zinc-405 border border-zinc-850 font-mono text-[9px] tracking-wider uppercase font-semibold rounded">THE CO CREATION BET</span>
                  <div className="space-y-2 text-zinc-400">
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed">
                      <span className="text-amber-550 font-mono">01/</span>
                      <p><strong className="text-zinc-200">Cross-Compile Skill Gaps:</strong> Bypass formal code-academy limits using direct multi-model logic synthesis.</p>
                    </div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed">
                      <span className="text-amber-550 font-mono">02/</span>
                      <p><strong className="text-zinc-200">Rapid Art Translation:</strong> Turn quick drawings into high-fidelity orthographies and mood references instantly.</p>
                    </div>
                    <div className="flex gap-2 items-start text-xs font-sans leading-relaxed">
                      <span className="text-amber-550 font-mono">03/</span>
                      <p><strong className="text-zinc-200">Autonomous Testing:</strong> Simulate millions of game events to isolate crash errors on solo hardware.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. THE SLATE - ROGUES GALLERY */}
        <section id="slate" className="bg-[#070709] py-18 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                  PLAYABLE UNIVERSES & PROTOTYPES
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Interactive Proof Engines
                </h3>
              </div>
              <p className="text-zinc-500 text-xs sm:text-sm max-w-md font-sans leading-relaxed">
                Games are our current arena. We design with deliberate intent, transitioning strange, aggressive game ideas from technical test branches into fully fledged, strategic vertical slices.
              </p>
            </div>

            {/* Grid of the 4 overhauled project cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {PROJECTS_DATA.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>

          </div>
        </section>

        {/* PLAYABLE PROOF SECTION */}
        <section id="playable-proof" className="py-18 sm:py-24 relative font-sans bg-[#09080c] border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                  FUNCTIONAL PROOF OF WORK
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  Playable Proof
                </h3>
                <div className="h-1 w-12 bg-amber-500 rounded" />
                <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed">
                  <p className="text-zinc-350 font-medium text-sm sm:text-base leading-relaxed">
                    Ultramonkeydog Studios has moved beyond concept documents. Two projects currently have public demo links with confirmed working access, persistent save states, and early unguided playtest feedback. This gives the studio a real proof-of-work foundation for grant applications, startup outreach, and future public playtesting.
                  </p>
                  <p>
                    Rather than relying solely on high-level architecture designs or prose summaries, we commit to immediate compilation pipelines. Our early, unguided playtester was able to jump directly into the active viewport modules and explore the systems without direct instructions—validating the UX onboarding foundations.
                  </p>
                  
                  {/* Feedback CTA */}
                  <div className="pt-4 border-t border-zinc-900 mt-6">
                    <p className="text-zinc-400 text-xs sm:text-sm mb-4">
                      Played one of the demos? Share first-session feedback on loading, save persistence, clarity, bugs, and fun.
                    </p>
                    <a 
                      href="https://forms.gle/ZHcmhicFxrvuY1hQ9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded transition-colors uppercase tracking-wider"
                    >
                      Give Demo Feedback
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative p-6 bg-zinc-950 border border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between hover:border-zinc-800 transition-colors shadow-2xl">
                {/* Visual HUD grid details */}
                <div className="absolute top-0 right-0 p-1.5 font-mono text-[9px] text-zinc-700 select-none tracking-widest">
                  COMPILE_VERIFIED // STABLE
                </div>
                
                <div className="space-y-5">
                  <span className="inline-flex py-0.5 px-2 bg-zinc-900 text-amber-500 border border-zinc-900/80 font-mono text-[9px] tracking-wider uppercase font-semibold rounded">
                    PROOF VERIFICATION CHECKLIST
                  </span>
                  
                  <ul className="space-y-3 font-sans list-none pl-0">
                    {[
                      { text: "Public demo links live", desc: "Bone League and Feral Formation operational sandboxes accessible now" },
                      { text: "Working access confirmed", desc: "Tested across multiple environments with layout stability mapping" },
                      { text: "Persistent save states", desc: "Zustand structures write variables securely to direct system local storage" },
                      { text: "Early unguided playtest feedback", desc: "Tester successfully navigated custom playbooks and tactics parameters" },
                      { text: "Ongoing iteration", desc: "Weekly code updates streaming without degrading client-side rendering speed" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs sm:text-sm leading-snug">
                        <div className="p-1 rounded bg-amber-950/20 border border-amber-900/40 text-amber-500 shrink-0 mt-0.5">
                          <Check size={11} className="text-amber-500" strokeWidth={3} />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-100 uppercase tracking-wide text-xs">{item.text}</p>
                          <p className="text-zinc-500 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. COGNITIVE ACCESSIBILITY PROOF - SAGA ORIGIN STORY */}
        <section id="fluff-dedication" className="py-18 sm:py-24 relative font-sans bg-[#0c0b0f] border-y border-zinc-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <div className="relative p-7 sm:p-12 rounded bg-zinc-950 border border-zinc-900 overflow-hidden shadow-black shadow-2xl">
                {/* Visual marker bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 font-mono" />
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                    DEDICATED CASE WORK
                  </span>
                  <div className="text-[9px] font-mono text-zinc-600 border border-zinc-900/80 px-2 py-0.5 rounded uppercase">
                    PROJ_FLUFF_REF
                  </div>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                  Saga of an Anxious Fluff: A Father's Dedication
                </h3>
                
                <div className="text-zinc-400 text-xs sm:text-sm space-y-5 leading-relaxed">
                  <p>
                    While Ultramonkeydog Studios builds deeply complex tactical and simulation games, our dedication to sensory-aware and cognitive-focused accessibility is deeply personal. Rather than restricting our entire studio output to accessibility design, we choose to concentrate that specific energy into our flagship project: <strong>Saga of an Anxious Fluff</strong>.
                  </p>
                  
                  <div className="p-5 my-6 rounded bg-zinc-900/40 border-l-4 border-amber-500 border-y border-r border-zinc-900/80 flex flex-col sm:flex-row gap-4 items-start">
                    <Heart size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-xs font-bold text-zinc-200 uppercase tracking-widest mb-1">Built For Cody's Son</h4>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                        Saga of an Anxious Fluff is personally dedicated to Cody’s son and shaped by family experience with autism, auditory/sensory sensitivity, speech delay, emotional readability, and the desire to make something colorful, exciting, and welcoming without making it shallow.
                      </p>
                    </div>
                  </div>

                  <p>
                    The game represents our study in cognitive ergonomics. By developing predictable play-loops, highly adjustable audio curves, steady typography, and emotional visual aids, we show that accessible family-friendly gameplay can maintain deep mechanical interest and satisfying, rewarding progression.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. AI-ASSISTED PRODUCTION METHOD */}
        <section id="workflows" className="py-18 sm:py-24 relative bg-[#070709] border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                HUMAN-LED. AI-ASSISTED. TASTE-PROTECTED.
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                Human-Led. AI-Assisted. Taste-Protected.
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Ultramonkeydog Studios uses AI like a production crew: coding assistant, debugger, design critic, documentation partner, art-direction helper, systems analyst, and planning engine. But AI does not decide the taste. It does not decide the soul. It does not decide what feels cool.
              </p>
              <p className="text-zinc-200 text-xs sm:text-sm font-semibold leading-relaxed font-sans">
                That stays human.
              </p>
            </div>

            {/* MethodGrid Component - Now structured into 9 detailed cells */}
            <MethodGrid />

          </div>
        </section>

        {/* 7. FOUNDER STATEMENT */}
        <section id="founder-bio" className="bg-[#0a0a0c] py-18 sm:py-24 border-b border-zinc-900 relative font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                
                {/* Creator Node graphics overlay */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center p-3 overflow-hidden shadow-2xl">
                    {/* Retro console dashboard mockup inside graphic */}
                    <div className="absolute inset-0 bg-[#121214]/50 pointer-events-none" />
                    <svg className="w-12 h-12 text-amber-500/80 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="9" y1="3" x2="9" y2="21" strokeDasharray="1 1" />
                      <path d="M7 8h10M7 12h10M7 16h10" />
                    </svg>
                    <div className="absolute bottom-2 inset-x-0 text-center text-[7.5px] font-mono text-zinc-600 tracking-widest uppercase">
                      AUTHOR_NODE_01 // CODY
                    </div>
                  </div>
                  
                  <span className="text-sm font-display font-extrabold text-zinc-100 mt-4 tracking-wide leading-none">
                    Cody Haring
                  </span>
                  <span className="text-[8.5px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">
                    Studio Director & Software Designer
                  </span>
                </div>

                {/* Narrative block */}
                <div className="md:col-span-8 space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                    THE CREATIVE DIRECTOR
                  </span>
                  
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Built By Cody Haring
                  </h3>
                  
                  <div className="text-zinc-400 text-xs sm:text-sm space-y-4 leading-relaxed font-sans">
                    <p>
                      Cody Haring is a self-taught game creator building Ultramonkeydog Studios through AI-assisted development, music influence, creature obsession, RPG systems, roguelite structure, horror energy, anime/manga taste, and a refusal to wait for permission.
                    </p>
                    <p>
                      The goal is simple: make original games that feel like they came from a person, not a template.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 8. STRATEGIC PIPELINE ROADMAP */}
        <section id="pipeline" className="py-18 sm:py-24 border-b border-zinc-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold">
                PARTNERSHIPS & PRODUCTION RUNS
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                Funding & Partnership Readiness
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Ultramonkeydog Studios is preparing grant, training, startup, and partnership materials to support a dedicated AI-assisted game-production pipeline.
              </p>
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                The studio is seeking support for:
                <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                  <li>a dedicated game-development workstation</li>
                  <li>drawing and visual production tools</li>
                  <li>premium AI production tools</li>
                  <li>original asset creation</li>
                  <li>playable demo development</li>
                  <li>public-facing project materials</li>
                  <li>future commercial release preparation</li>
                </ul>
              </div>
              <p className="text-amber-500 text-xs sm:text-sm leading-relaxed font-sans font-semibold">
                The studio is not starting from zero — public demos are live, links have been tested, save states persist, and early unguided playtest feedback is positive.
              </p>
            </div>

            {/* Grid of Roadmap needs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {FUNDING_NEEDS.map((need, i) => (
                <div key={i} className="p-5 rounded bg-zinc-950 border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors group relative overflow-hidden select-none">
                  {/* Subtle pixel indicator representing node number */}
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-900 group-hover:bg-amber-500 transition-colors" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono font-bold py-0.5 px-2 bg-zinc-900 border border-zinc-850 rounded uppercase tracking-wider text-zinc-400">
                        {need.urgency}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-700">STG_{String(i+1).padStart(2, "0")}</span>
                    </div>
                    <h4 className="font-display font-bold text-zinc-100 text-xs sm:text-sm group-hover:text-white transition-colors">
                      {need.title}
                    </h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-sans mt-1 group-hover:text-zinc-400 transition-colors">
                      {need.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Funder verification callout bar (high-contrast, professional but stylistic) */}
            <div className="p-6 rounded bg-[#0b0a0d] border border-zinc-900 text-center flex flex-col lg:flex-row lg:items-center justify-between gap-5 max-w-4xl mx-auto font-sans relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
              
              <div className="flex items-start gap-3.5 text-left pl-2">
                <div className="p-2.5 bg-zinc-950 border border-zinc-900 rounded text-zinc-300 shrink-0">
                  <FileCheck size={18} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-widest font-bold">PORTABILITY & AUDREYS</span>
                  <p className="text-zinc-350 text-xs mt-0.5 leading-relaxed font-medium">
                    We are compiling official technical whitepapers, pilot study parameters, and budget breakdowns for grant committees, universities, and commercial incubators.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection("contact-node")}
                className="cursor-pointer font-mono text-xs bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-5 py-3 rounded transition-all whitespace-nowrap uppercase tracking-wider shadow"
              >
                Request Pitch Materials
              </button>
            </div>

          </div>
        </section>

        {/* 9. CONTACT SECTION */}
        <section id="contact-node" className="py-16 sm:py-28 border-t border-zinc-900/60 bg-gradient-to-b from-transparent to-[#040405] relative font-sans">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block font-bold mb-1">
              ESTABLISH COOPERATIVE DIRECTORIES
            </span>
            
            <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
              Contact Ultramonkeydog Studios
            </h3>
            
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-10">
              For funding, collaboration, partnership, or project inquiries:
            </p>
            
            <div className="mb-10 p-4 bg-zinc-950/40 border border-zinc-900 rounded inline-flex flex-col items-center gap-3">
              <p className="text-zinc-400 text-xs">Public demo feedback is currently being collected through a short Google Form.</p>
              <a 
                href="https://forms.gle/ZHcmhicFxrvuY1hQ9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold px-4 py-2 rounded transition-colors uppercase tracking-wider"
              >
                Demo Feedback Form
              </a>
            </div>

            {/* Minimalist interactive email display card */}
            <div className="bg-zinc-950/60 rounded p-6 border-2 border-zinc-900 max-w-sm mx-auto mb-10 flex flex-col items-center justify-center gap-3.5 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
              
              <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                DIRECT INQUIRY NODE
              </span>
              
              <div className="flex items-center gap-2 bg-[#0d0d0f] px-3.5 py-2 rounded-md border border-zinc-900 w-full justify-between">
                <span className="font-mono text-xs text-zinc-250 select-all font-semibold">
                  {emailAddress}
                </span>
                
                <button
                  onClick={handleCopyEmail}
                  className="interactive-button focus:outline-hidden p-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded text-zinc-450 hover:text-white transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                        <Check size={12} className="text-amber-500" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                        <Copy size={12} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="text-[9px] text-zinc-550 font-mono tracking-wider font-semibold">
                FOUNDER // CODY HARING
              </div>
            </div>

            {/* Direct Mailto Button */}
            <a 
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 px-7 py-3.5 rounded font-mono text-xs font-bold tracking-widest transition-colors uppercase shadow border border-zinc-300"
            >
              <Mail size={14} strokeWidth={2.5} />
              Contact the Studio
            </a>

          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer id="app-footer" className="bg-[#040405] py-12 border-t border-zinc-900 text-center text-[11px] text-zinc-600 font-mono relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-2.5 text-[10px] tracking-wide text-zinc-500">
            <span className="text-zinc-300 font-extrabold tracking-widest">Ultramonkeydog Studios</span>
            <span className="hidden sm:inline">|</span>
            <span>Independent Original Game Creator & Systems Laboratory</span>
          </div>
          
          <div className="text-[9px] text-zinc-700 font-medium">
            &copy; {currentYear} Cody Haring. All rights reserved.
            <span className="mx-2">•</span> 
            Human-led, software-assisted interactive play.
          </div>
        </div>
      </footer>

    </div>
  );
}
