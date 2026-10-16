# itch.io devlog #1 — draft (post at launch or shortly after)

**Title:** `MUTTPIT arrives — a browser auto-battler that keeps receipts`

---

Thirty-six dogs just moved into the Pit.

MUTTPIT is live and free in the browser: draft a kennel of scarred, junk-armored mongrels, write each dog's Bite Order, and mail your kennel into eight weeks of Bone Bracket bouts. No account, no install.

The strangest thing about it isn't the dogs — it's the receipts. Every fight resolves as pure deterministic simulation: same kennels, same seed, same event log, same replay hash on any machine. Outcomes arrive as Verdict Packets that fail audit the moment anyone tampers with them. If you and a friend fight, you can each re-derive the result locally and compare. That's also why "play-by-mail" is literal here: export a Kennel Code, import theirs, resolve, mail the packet back.

This build exists because of an unusually compressed production run: roughly 44 hours from repository baseline to the inspected public build, directed by me (Cody Haring) through a private development system I built, with MAW as an execution surface and Claude Code contributing implementation later in the run. The dog and key art are AI-assisted and disclosed; the rules, simulation, interface, writing and every final call are human-directed. If you want the unglamorous version — balance measurement, browser-found bugs, deterministic decision tests, post-launch repair — the repository history and the studio dispatches carry it.

What I don't know yet: whether any of this earns a place in your rotation. If you play it, tell me what the Bite Order system feels like to actually direct — that's the part I most want challenged.

Play: https://ultramonkeydog-studios.vercel.app/play/muttpit/
Runtime captures and the project record: https://ultramonkeydog-studios.vercel.app/muttpit
The receipts story: https://ultramonkeydog-studios.vercel.app/dispatches/the-pit-keeps-receipts

— Cody Haring, Ultramonkeydog Studios

**Proof boundary (keep this line or an equivalent):** This is a small free studio game and a proof of production capability, not a live service or a commercial claim.
