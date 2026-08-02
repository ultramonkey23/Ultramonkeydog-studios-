# Ultramonkeydog Studios Website

Public studio website for **Ultramonkeydog Studios**.

*“Strange games. Deep systems. AI-assisted production. Human taste at the wheel.”*

## Public boundary

This repository is a public presentation consumer—not the owner of private studio infrastructure or project decision engines.

- Do not publish credentials, logs, internal routing, orchestration details, private operating architecture, or generated snapshots containing them.
- Each project owns its runtime and decision logic.
- Box o' Battles verdicts are produced by the Box o' Battles project and may be presented here only as approved read-only packets.
- Run `npm run boundary:check` before publishing.

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS

## Local setup

```bash
npm install
npm run dev
```

## Validation and build

```bash
npm run boundary:check
npm run lint
npm run build
```

Generated spatial snapshots are intentionally ignored because they can preserve stale or private page copy. Regenerate them locally for review instead of committing them.
