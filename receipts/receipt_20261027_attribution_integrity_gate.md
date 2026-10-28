# receipt_20261027_attribution_integrity_gate - attribution claims get machine witnesses

LAB_RECEIPT_CONTRACT_V1:
PRIME_LAW_COMPLIANT: yes
RESULT: PASS - attribution integrity gate green on the real tree (11 tagged external links, 7 channel tags, 37 untagged links honestly reported as UNKNOWN attribution), wired into boundary:check so npm run build enforces it; negative control proved all three failure classes fire
ACTUAL_WORK_REQUIRED: yes
ACTUAL_WORK_COMPLETED: yes
WORK_PRODUCT_TYPE: Regression gate (scanner + build wiring) closing a named unfinished front in this repo's own receipts
RISK_LANE: LOW
PARENT_DIRECTOR_OBJECTIVE: Cross-client real-work wave: each project closes its own named open front as the evidence unit, with receipts and repo commits
CURRENT_COHERENT_MISSION: Close the attribution integrity front named in receipt_20261023_attribution_repair.md (SURVIVING_GAPS: claims on the page carry no machine witnesses; untagged links are invisible to the design) by giving the attribution contract a build-time checker
MISSION_RELATIONSHIP: CHILD_ADVANCES_PARENT
PARENT_STATUS: OPEN
CHILD_STATUS: PASS
SURVIVING_PARENT_GAPS: untagged external links (37) remain UNKNOWN attribution - reported and visible, deliberately not failed (attribution of an untagged link is unknown until the author tags it); the checker verifies tag structure and destination truth at build time, not the truthfulness of a tag's claims; sitemap:discover script slugs are provider-adjacent sources of destination truth not yet enumerated (none carry attribution links today)
INTENDED_ADVANTAGE: the page's own law (a link is a verifiable claim, not a decoration) is now enforced at build time: an unverifiable attribution cannot ship silently
RECOVERED_INHERITANCE: the repo's gate chain recovered the same discipline the canon identity gate gave creative claims: claims get machine witnesses, and the witness is proven red before it is trusted green
CANONICAL_OWNERS: scripts/attribution-integrity-check.mjs (the checker), package.json (attribution:check + boundary:check wiring), docs/attribution.html (the claim surface), scripts/build-discovery-spine.mjs + scripts/*.mjs (provider slugs = destination truth), public/ + static/ (built URL space), blog/rss.xml
CONSUMER_TRACE: The 2026-10-23 receipt named the gap (claims carry no machine witnesses; untagged links invisible) -> this checker reads every outbound link from the authoring surface (markdown sources and page templates, never the generated output that re-renders the same claims), classifies each external link as tagged (a tag table row with the full trio: system, channel, url) or UNKNOWN, verifies tag destination integrity against provider truth only (writePage slugs, module slug maps, written.push lists, public/ static files), reports coverage as honest numbers (never 100% over a cherry-picked denominator), and fails the build on four classes: incomplete tag trio, empty tag value, dead internal destination, conflicting channel tags
GENERICITY_CHECK: destination truth comes from the providers themselves (the same build modules that write the URLs), not from a second hand-maintained list; dynamic template destinations are exempt from dead-destination and keyed by raw template text for conflicts, so the checker follows the build instead of freezing it
VERTICAL_SLICE_CHECK: authored link -> markdown/template source -> provider destination -> tag table -> checker verdict -> boundary:check -> npm run build; each hop proven (scanner gap probes removed after fixing, negative-control fixture fired exactly the three expected failures, real run green, full build green)
PROOF_CLAIM_MATCH: every claim names its witness: negative control (probe file with trio defect, dead destination, channel conflict -> exactly those three failures, then deleted), scanner-gap probes (self-reading template url + dynamic projectPage ids -> fixed with provider-truth and raw-template keying), real run numbers (11 tagged / 7 channels / 37 UNKNOWN), npm run build exit 0
PROOF_BUDGET_USED: one negative-control fixture cycle, two scanner-gap probe cycles, one real-tree run, one full npm run build; under 3 minutes of compute
FILES_CHANGED: scripts/attribution-integrity-check.mjs, package.json, receipts/receipt_20261027_attribution_integrity_gate.md

## DIRECTOR_READABLE

The attribution page says a link is a verifiable claim, not a decoration - and its own repair receipt (2026-10-23) admitted the claims had no machine witnesses. That gap is what this closes.

1. The gate exists and is wired into the build. `npm run attribution:check` runs a scanner that reads every outbound link from the authored sources, checks every tagged link's full trio (system, channel, url) against destination truth taken ONLY from the providers (writePage slugs, slug maps, written.push, public/ files), and fails the build on four classes: incomplete tag trio, empty tag value, dead internal destination, conflicting channel tags. It sits in the boundary:check chain, so `npm run build` now enforces it like the other truth gates.

2. The scanner is honest where it is weak. Two probe rounds proved real gaps (a template that reads its own url variable, dynamic projectPage ids) - both fixed against provider truth. The 37 untagged external links are REPORTED as UNKNOWN attribution and never failed, because the honest coverage is 11 tagged / 37 unknown, not "100%" of a denominator I would have chosen.

3. Proven red before trusted green. A fixture seeded with exactly three defects (trio broken, dead destination, one url claiming two channels) produced exactly those three failures - named - then was deleted. The real tree and the full build are green.

What I am NOT claiming: the tags' claims are truthful (the gate checks structure and destination, not honesty); untagged links are attributed (they are unknown until you tag them).

## LANDING_TRACE

START_HEAD: 543bd7a
END_HEAD: 673d772
