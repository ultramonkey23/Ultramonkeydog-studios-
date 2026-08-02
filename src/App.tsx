/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Brush,
  Copy,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  Headphones,
  Heart,
  Mail,
  Radio,
  Skull,
  Sparkles,
  Swords,
  WandSparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { FUNDING_NEEDS, PROJECTS_DATA } from "./data";
import BoxOBattlesApp from "./components/BoxOBattlesApp";
import MethodGrid from "./components/MethodGrid";
import ProjectCard from "./components/ProjectCard";
import "./studio-front-door.css";

const emailAddress = "haringcody@gmail.com";

const doorways = [
  {
    id: "play",
    eyebrow: "Grab the controller",
    title: "Games that grow teeth",
    copy: "Creature RPGs, tactical roguelites, sports horror, native mobile experiments, and systems that keep mutating after the first run.",
    icon: Gamepad2,
    tone: "rust",
  },
  {
    id: "worlds",
    eyebrow: "Follow the spoor",
    title: "Worlds, creatures & stories",
    copy: "Lore, characters, strange ecologies, family-facing adventures, horror energy, anime influence, and story systems built to survive more than one medium.",
    icon: BookOpen,
    tone: "violet",
  },
  {
    id: "sights-sounds",
    eyebrow: "Turn it up",
    title: "Art, sound & motion",
    copy: "Creature silhouettes, visual identities, music direction, trailers, performance, animation, and media built around the emotional life of each property.",
    icon: Headphones,
    tone: "cyan",
  },
  {
    id: "box-o-battles",
    eyebrow: "Settle it properly",
    title: "Box o’ Battles",
    copy: "A comic-book matchup arena where versions are locked, evidence matters, and permanent victory beats loud power-scaling nonsense.",
    icon: Swords,
    tone: "gold",
  },
  {
    id: "experiments",
    eyebrow: "Pull the weird lever",
    title: "Tools, research & experiments",
    copy: "Public-facing creative tools, evidence-aware systems, prototypes, and unusual production experiments—shown through what they make, not private machinery.",
    icon: FlaskConical,
    tone: "bile",
  },
  {
    id: "contact",
    eyebrow: "Join the trouble",
    title: "Collaboration & support",
    copy: "Publishing, grants, art, audio, testing, hardware, partnerships, and collaborators who want to help strange work become real.",
    icon: Heart,
    tone: "pink",
  },
] as const;

const liveGames = PROJECTS_DATA.filter((project) => project.demoUrl);
const studioProjects = PROJECTS_DATA.filter((project) => project.id !== "box-o-battles");

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ children }: { children: string }) {
  return <p className="front-door__label">{children}</p>;
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
    <div className="front-door min-h-screen text-[var(--umd-bone)] antialiased">
      <header className="front-door__nav">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="front-door__brand"
          aria-label="Back to the top"
        >
          <span className="front-door__brand-mark" aria-hidden="true">
            <Skull size={20} />
            <Sparkles size={10} />
          </span>
          <span>
            <strong>Ultramonkeydog</strong>
            <small>Studios</small>
          </span>
        </button>

        <nav aria-label="Primary navigation" className="front-door__nav-links">
          <button type="button" onClick={() => scrollToSection("play")}>Play</button>
          <button type="button" onClick={() => scrollToSection("worlds")}>Worlds</button>
          <button type="button" onClick={() => scrollToSection("box-o-battles")}>The Box</button>
          <button type="button" onClick={() => scrollToSection("contact")}>Contact</button>
        </nav>
      </header>

      <main>
        <section className="front-door__hero" aria-labelledby="studio-title">
          <div className="front-door__hero-art" aria-hidden="true">
            <div className="front-door__moon" />
            <div className="front-door__beast front-door__beast--one" />
            <div className="front-door__beast front-door__beast--two" />
            <div className="front-door__hero-sparks" />
          </div>

          <div className="front-door__hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="front-door__hero-kicker">
                Creator-owned multimedia weirdness from Cody Haring
              </p>
              <h1 id="studio-title">
                WE MAKE
                <span>WEIRD THINGS</span>
                THAT BITE BACK.
              </h1>
              <p className="front-door__hero-lede">
                Games, creatures, stories, art, sound, strange tools, and matchup chaos—built with deep systems and a very human sense of taste.
              </p>

              <div className="front-door__hero-actions">
                <button type="button" onClick={() => scrollToSection("play")} className="front-door__button front-door__button--primary">
                  Play something
                  <Gamepad2 size={17} />
                </button>
                <button type="button" onClick={() => scrollToSection("doorways")} className="front-door__button front-door__button--ghost">
                  Explore the studio
                  <ArrowDown size={17} />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="front-door__ticker" aria-label="Studio creative lanes">
            <span>CREATURES</span><i>◆</i><span>ROGUELITES</span><i>◆</i><span>HORROR</span><i>◆</i><span>STORIES</span><i>◆</i><span>ART</span><i>◆</i><span>SOUND</span><i>◆</i><span>WEIRD TOOLS</span><i>◆</i><span>BIG FIGHTS</span>
          </div>
        </section>

        <section id="doorways" className="front-door__section front-door__section--doors">
          <div className="front-door__section-heading">
            <SectionLabel>Pick a door. Something is growling behind each one.</SectionLabel>
            <h2>This is a whole studio organism—not one game wearing six hats.</h2>
            <p>
              Every property keeps its own identity. The shared signature is Cody’s taste: creatures, pressure, transformation, dark humor, emotional stakes, and systems with real guts.
            </p>
          </div>

          <div className="front-door__door-grid">
            {doorways.map((door, index) => {
              const Icon = door.icon;
              return (
                <motion.button
                  key={door.id}
                  type="button"
                  onClick={() => scrollToSection(door.id)}
                  className="front-door__door"
                  data-tone={door.tone}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <span className="front-door__door-number">0{index + 1}</span>
                  <Icon size={24} />
                  <small>{door.eyebrow}</small>
                  <strong>{door.title}</strong>
                  <p>{door.copy}</p>
                  <span className="front-door__door-enter">Enter <ArrowUpRight size={14} /></span>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section id="play" className="front-door__section front-door__section--play">
          <div className="front-door__section-heading front-door__section-heading--split">
            <div>
              <SectionLabel>Playable right now</SectionLabel>
              <h2>Stop reading. Go make a bad decision.</h2>
            </div>
            <p>Two browser games are live. They are not trailers, mockups, or “coming soon” buttons.</p>
          </div>

          <div className="front-door__live-grid">
            {liveGames.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="front-door__live-card"
                data-project={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="front-door__live-status">PLAYABLE NOW</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="front-door__play-link">
                  {project.demoLabel ?? "Play now"}
                  <ExternalLink size={16} />
                </span>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="worlds" className="front-door__section front-door__section--worlds">
          <div className="front-door__section-heading front-door__section-heading--split">
            <div>
              <SectionLabel>Games, worlds & creatures in motion</SectionLabel>
              <h2>The current menagerie.</h2>
            </div>
            <p>
              Open a card for the deeper receipts. The front stays focused on the hook, the mood, and why the thing exists.
            </p>
          </div>

          <div className="front-door__project-grid">
            {studioProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="sights-sounds" className="front-door__section front-door__section--media">
          <div className="front-door__media-copy">
            <SectionLabel>Beyond the controller</SectionLabel>
            <h2>Worlds should have a voice, a pulse, a silhouette, and something nasty lurking off-screen.</h2>
            <p>
              Ultramonkeydog Studios is built to stretch across writing, creature design, visual art, music and sound direction, trailers, performance, comics, and interactive experiments—without forcing every property into the same costume.
            </p>
            <div className="front-door__media-tags" aria-label="Studio media lanes">
              <span><BookOpen size={15} /> Storyworlds</span>
              <span><Brush size={15} /> Visual art</span>
              <span><Headphones size={15} /> Music & sound</span>
              <span><Radio size={15} /> Video & performance</span>
              <span><WandSparkles size={15} /> Cross-media experiments</span>
            </div>
          </div>
          <div className="front-door__media-poster" aria-hidden="true">
            <span>MAKE IT</span>
            <strong>STRANGER</strong>
            <i>THEN MAKE IT WORK</i>
          </div>
        </section>

        <section id="box-o-battles" className="front-door__section front-door__section--box">
          <div className="front-door__box-intro">
            <div>
              <SectionLabel>Featured studio attraction</SectionLabel>
              <h2>PUT ’EM IN THE BOX.</h2>
            </div>
            <p>
              Box o’ Battles is part comic issue, part evidence hearing, part “who actually stays dead?” machine. This website displays the owner-held card packet without pretending to recalculate it.
            </p>
          </div>
          <BoxOBattlesApp />
        </section>

        <section id="experiments" className="front-door__section front-door__section--experiments">
          <div className="front-door__section-heading front-door__section-heading--split">
            <div>
              <SectionLabel>Fresh mutations & honest receipts</SectionLabel>
              <h2>The cool stuff stays up front. The proof room is still here.</h2>
            </div>
            <p>
              Open this only when you want current evidence, production capabilities, ownership boundaries, and the exact limits of what has been proven.
            </p>
          </div>

          <details className="front-door__guts">
            <summary>
              <span><FlaskConical size={18} /> Open the studio guts</span>
              <small>Signals, receipts, production lanes, and proof ceilings</small>
            </summary>
            <div className="front-door__guts-body">
              <MethodGrid />
            </div>
          </details>
        </section>

        <section className="front-door__section front-door__section--cody">
          <div className="front-door__cody-card">
            <div>
              <SectionLabel>Built by Cody Haring</SectionLabel>
              <h2>One human director. A lot of monsters.</h2>
              <p>
                Cody creates the concepts, chooses the systems, pushes the weirdness, rejects the generic parts, judges the feel, and decides what earns release. The studio pulls from death metal, underground hip hop, RPGs, roguelites, anime, manga, horror, creature obsession, and family life.
              </p>
            </div>
            <div className="front-door__cody-stamp" aria-hidden="true">
              <span>HUMAN</span>
              <strong>TASTE</strong>
              <span>FINAL BOSS</span>
            </div>
          </div>
        </section>

        <section id="contact" className="front-door__section front-door__section--contact">
          <div className="front-door__contact-copy">
            <SectionLabel>Collaboration, publishing & support</SectionLabel>
            <h2>Help strange work become dangerous.</h2>
            <p>
              Reach out about publishing, grants, art, audio, testing, hardware, original assets, partnerships, or helping one of these worlds grow a sharper set of teeth.
            </p>
            <div className="front-door__contact-actions">
              <a href={`mailto:${emailAddress}`} className="front-door__button front-door__button--primary">
                <Mail size={16} /> Email Cody
              </a>
              <button type="button" onClick={handleCopyEmail} className="front-door__button front-door__button--ghost">
                <Copy size={16} /> {copied ? "Copied" : "Copy email"}
              </button>
            </div>
          </div>

          <div className="front-door__support-grid">
            {FUNDING_NEEDS.slice(0, 6).map((need) => (
              <article key={need.title}>
                <small>{need.urgency}</small>
                <strong>{need.title}</strong>
                <p>{need.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="front-door__footer">
        <span>© {currentYear} Ultramonkeydog Studios</span>
        <span>Games · Worlds · Art · Sound · Strange Experiments</span>
      </footer>

      <SpeedInsights />
    </div>
  );
}
