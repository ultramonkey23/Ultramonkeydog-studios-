/** @license SPDX-License-Identifier: Apache-2.0 */
import { lazy, Suspense, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { PROJECTS_DATA } from "./data";
import type { Project } from "./types";
import ProjectCard from "./components/ProjectCard";
import "./studio-cover.css";

const BoxArena = lazy(() => import("./components/BoxArena"));
const MethodGrid = lazy(() => import("./components/MethodGrid"));
const email = "haringcody@gmail.com";
const worlds = [
  {
    id: "savage-crown",
    chapter: "01",
    line: "Become the thing the world fears.",
    promise:
      "Biological horror. Hostile supernatural systems. A creature identity that grows through mutation, grafts and passive synergy.",
    cue: "MUTATION / CONSEQUENCE",
    type: "Flagship · in development",
  },
  {
    id: "what-we-fed",
    chapter: "02",
    line: "Hunger is a choice. So is attachment.",
    promise:
      "A dark mythic creature RPG built around Bond vs Eat: what you keep, what you consume, and what you become.",
    cue: "HUNGER / BOND",
    type: "Creature RPG · in development",
  },
  {
    id: "saga-anxious-fluff",
    chapter: "03",
    line: "Wonder deserves depth.",
    promise:
      "A family-facing creature-growth RPG dedicated to Cody’s son. Tenderness, strange creatures and deep progression belong in the same world.",
    cue: "TENDERNESS / DEPTH",
    type: "Long-horizon project · early build",
  },
];
const contactUrl = `mailto:${email}?subject=${encodeURIComponent("[UMD STUDIO] A specific idea")}&body=${encodeURIComponent("Hi Cody,\n\nI’m interested in:\nMy idea or question:\nRelevant link (optional):\nTiming (if relevant):\n")}`;

function WorldRecord({
  project,
  chapter,
  line,
  promise,
  cue,
  type,
}: {
  project: Project;
  chapter: string;
  line: string;
  promise: string;
  cue: string;
  type: string;
}) {
  return (
    <article className={`world-record world-record--${project.id}`}>
      <div className="world-record__rail">
        <span>{chapter}</span>
        <span>{cue}</span>
      </div>
      <div className="world-record__name">
        <p className="cover-kicker">{type}</p>
        <h3>{project.title}</h3>
        <a href={`/${project.id}`} className="cover-text-link">
          Enter the project <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="world-record__story">
        <h4>{line}</h4>
        <p>{promise}</p>
        {project.id === "saga-anxious-fluff" && (
          <p className="world-record__boundary">
            Sensory-aware design is an intent. Accessibility outcomes remain
            untested.
          </p>
        )}
        <details className="cover-detail">
          <summary>
            What exists &amp; what remains unproved{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <ProjectCard project={project} />
        </details>
      </div>
    </article>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const feral = PROJECTS_DATA.find((p) => p.id === "feral-formation")!;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="cover-site">
      <a className="cover-skip" href="#main">
        Skip to the work
      </a>
      <header className="cover-nav">
        <a
          href="/"
          className="cover-wordmark"
          aria-label="Ultramonkeydog Studios home"
        >
          <span>ULTRAMONKEYDOG</span>
          <small>STUDIOS / CODY HARING</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#worlds">The work</a>
          <a href="#cody">The human</a>
          <a href="#contact">
            Get in touch <ArrowUpRight size={14} />
          </a>
          <a href="/press" className="cover-nav__press">
            Press kit
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="studio-cover" aria-labelledby="studio-title">
          <div className="studio-cover__copy">
            <p className="cover-kicker">
              Independent art. Strange software. Human direction.
            </p>
            <h1 id="studio-title">
              <span className="cover-title__setup">We make</span>
              <span className="cover-title__weird">weird</span>
              <span className="cover-title__things">things</span>
              <span className="cover-title__bite">that bite back.</span>
            </h1>
            <p className="studio-cover__intro">
              Games, creature worlds, sound and unusual systems. Created and
              directed by <a href="#cody">Cody Haring</a>.
            </p>
            <a href="#worlds" className="cover-action">
              Explore the worlds <ArrowDown size={18} />
            </a>
            <p className="studio-cover__note">
              Flagship work is in development.
              <br />
              This is a studio doorway, not a release announcement.
            </p>
          </div>
          <figure className="studio-cover__art">
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/studio-transformation-cover-v2.webp"
              />
              <img
                src="/assets/studio-transformation-cover-v2.png"
                width="1024"
                height="1536"
                fetchPriority="high"
                alt="Studio illustration: a small vulnerable creature transforms into a large bone-armored predator, retaining its asymmetric eye and hooked snout."
              />
            </picture>
            <figcaption>
              STUDIO COVER STUDY / AI-ASSISTED ILLUSTRATION / NOT GAMEPLAY
            </figcaption>
          </figure>
          <div className="studio-cover__edge" aria-hidden="true">
            <span>SMALL BEGINNINGS</span>
            <span>STRANGE CONSEQUENCES</span>
          </div>
        </section>
        <section className="cover-manifesto" aria-labelledby="manifesto-title">
          <p className="cover-kicker">The shared obsession</p>
          <h2 id="manifesto-title">
            Growth should change
            <br />
            <em>more than the numbers.</em>
          </h2>
          <div>
            <p>
              New anatomy. New verbs. A world that reacts differently. The
              studio’s worlds are built around transformation with consequences.
            </p>
            <p>
              Horror can carry wonder. A monster can be tender. Deep systems can
              have a sense of humor.
            </p>
          </div>
        </section>
        <section
          id="worlds"
          className="cover-worlds"
          aria-labelledby="worlds-title"
        >
          <div className="cover-section-head">
            <p className="cover-kicker">Different worlds. One human’s taste.</p>
            <h2 id="worlds-title">The work.</h2>
            <p>No single skin fits all of it.</p>
          </div>
          {worlds.map((w) => (
            <WorldRecord
              key={w.id}
              project={PROJECTS_DATA.find((p) => p.id === w.id)!}
              {...w}
            />
          ))}
        </section>
        <section className="cover-workbench" aria-labelledby="bench-title">
          <div className="cover-section-head">
            <p className="cover-kicker">Sound / play / argument</p>
            <h2 id="bench-title">Other frequencies.</h2>
          </div>
          <div className="cover-bench-grid">
            <article className="bench-audio">
              <span className="cover-kicker">Audio tools · in development</span>
              <h3>
                Monkey’s
                <br />
                <em>Ear.</em>
              </h3>
              <p>
                Audio modules and plugins for production-first control and
                optional weirdness. Voice/Vocal is the current validation
                candidate.
              </p>
              <p className="bench-boundary">
                Automated Windows build and state-reconstruction proof exists.
                Real host workflow, listening and stable distribution remain
                incomplete. No commercial release or audio-quality claim here.
              </p>
              <a href="/press#monkeys-ear" className="cover-text-link">
                Read the current audio boundary <ArrowUpRight size={18} />
              </a>
            </article>
            <div className="cover-bench-secondary">
              <article>
                <span className="cover-kicker">
                  A smaller piece you can try
                </span>
                <h3>{feral.title}</h3>
                <p>{feral.description}</p>
                <a
                  href={feral.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cover-text-link"
                >
                  Try the browser demo <ArrowUpRight size={18} />
                </a>
                <p className="bench-boundary">
                  Secondary portfolio work. Not a flagship launch.
                </p>
              </article>
              <article id="box-o-battles">
                <span className="cover-kicker">The Box</span>
                <h3>A fight is only as good as its argument.</h3>
                <p>
                  Box o’ Battles presents version-locked matchup candidates and
                  their evidence boundaries. A precomputed result is not a canon
                  probability.
                </p>
                <button
                  className="cover-text-link"
                  onClick={() => setShowBox((v) => !v)}
                  aria-expanded={showBox}
                  aria-controls="box-preview"
                >
                  {showBox ? "Close" : "Open"} the matchup matrix{" "}
                  <ArrowUpRight size={18} />
                </button>
              </article>
            </div>
          </div>
          {showBox && (
            <div id="box-preview" className="cover-box">
              <Suspense fallback={<p>Loading the owner’s matchup record…</p>}>
                <BoxArena />
              </Suspense>
            </div>
          )}
        </section>
        <section
          id="cody"
          className="cover-founder"
          aria-labelledby="founder-title"
        >
          <div className="cover-founder__margin">
            <span>AUTHOR / DIRECTOR</span>
            <span>
              HUMAN TASTE
              <br />
              AT THE WHEEL.
            </span>
          </div>
          <div>
            <p className="cover-kicker">The person behind the work</p>
            <h2 id="founder-title">
              Cody
              <br />
              <em>Haring.</em>
            </h2>
            <p className="cover-founder__lede">
              Self-taught. Independent.
              <br />
              Making room for unusual things.
            </p>
          </div>
          <div className="cover-founder__story">
            <p>
              I’m an autistic creator building games, tools and worlds with AI
              as a bridge across disciplines. I originate the concepts, design
              the systems, direct production, reject what doesn’t fit and decide
              what earns release.
            </p>
            <p>
              Death-metal tension. Underground-hip-hop recombination. Creature
              obsession, RPGs, horror and family life. Those influences shape
              how the work moves—not just how it looks.
            </p>
            <p>
              A private creation engine helps bring the work to life.
              Authorship, creative control and final judgment stay with me.
            </p>
            <a className="cover-text-link" href="/press">
              Founder story &amp; press kit <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section
          id="contact"
          className="cover-contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="cover-kicker">
              A quiet doorway. A specific conversation.
            </p>
            <h2 id="contact-title">
              Have something
              <br />
              <em>worth making real?</em>
            </h2>
            <p>
              Ask about a project, an interview, original art or audio, a
              suitable program, or a partnership that preserves creative
              control.
            </p>
            <a href={contactUrl} className="cover-action">
              Start a specific conversation <ArrowUpRight size={18} />
            </a>
            <div className="cover-email">
              <a href={`mailto:${email}`}>{email}</a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy Cody’s email"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <span role="status">{copied ? "Copied" : ""}</span>
            </div>
          </div>
          <aside>
            <h3>Independent by design.</h3>
            <p>
              Original products, direct audience support, grants, credits and
              selective partnerships. No consulting or custom client-service
              offer.
            </p>
            <p>
              No paid role, compensation or revenue share is promised here. Any
              collaboration needs its own clear agreement.
            </p>
            <p>
              Contact uses your email app. No mailing-list enrollment. Please
              don’t send confidential material.
            </p>
          </aside>
        </section>
        <section className="cover-records" aria-label="Further studio records">
          <button
            className="cover-text-link"
            aria-expanded={showProof}
            aria-controls="studio-records"
            onClick={() => setShowProof((v) => !v)}
          >
            {showProof ? "Close" : "Open"} the development record{" "}
            <span aria-hidden="true">{showProof ? "−" : "+"}</span>
          </button>
          {showProof && (
            <div id="studio-records">
              <Suspense fallback={<p>Loading the development record…</p>}>
                <MethodGrid />
              </Suspense>
            </div>
          )}
          <details>
            <summary>Project archive</summary>
            <nav aria-label="Project archive">
              {PROJECTS_DATA.map((p) => (
                <a key={p.id} href={`/${p.id}`}>
                  {p.title}
                </a>
              ))}
            </nav>
          </details>
        </section>
      </main>
      <footer className="cover-footer">
        <a href="/press">Press kit</a>
        <a
          href="https://monkeydog23.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          itch.io
        </a>
        <span>
          © {new Date().getFullYear()} Cody Haring / Ultramonkeydog Studios
        </span>
        <span>Creator-owned. Human-directed.</span>
      </footer>
      <SpeedInsights />
    </div>
  );
}
