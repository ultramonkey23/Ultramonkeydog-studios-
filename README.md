# Ultramonkeydog Studios Website

Public studio website for **Ultramonkeydog Studios**.
*“Strange games. Deep systems. AI-assisted production. Human taste at the wheel.”*

> **Warning:** This is the public studio site codebase, not the private Monkeydog Lab. Do not expose private Lab details here.

## Tech Stack
- Vite
- React
- TypeScript
- Tailwind CSS

## Local Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   *(Only if local AI integrations are active, though mostly static at present)*
   Copy `.env.example` to `.env.local` and add any necessary keys.

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

## Validation & Build

- **Lint:** `npm run lint` (uses `tsc --noEmit` to type-check)
- **Build:** `npm run build` (outputs to `/dist`)
