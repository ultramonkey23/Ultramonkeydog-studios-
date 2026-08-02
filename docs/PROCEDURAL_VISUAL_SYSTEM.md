# Procedural Visual System

Status: active public-site implementation contract

## Purpose

Replace generic glass-dashboard styling and decorative AI imagery with a deterministic studio framing system derived from current project and creator laws.

This system is presentation framing. It is not gameplay capture, concept art, or evidence that a project visual has been integrated into its game.

## Authority chain

1. Current project owners and witnessed media
2. Cody's current direction
3. Savage Crown body-first visual law and visual evidence rubric
4. Creator Memory style and identity guidance
5. True Scholar UI-blindness research
6. External references

## Visual laws

- Character and project identity before effect.
- Authored media stays authoritative; procedural output supplies energy, framing, weather, signal, and transition.
- Hard tone bands instead of smooth airbrushed gradients.
- Ordered dithering instead of bloom fog.
- Low-resolution internal rendering with nearest-neighbor enlargement.
- Near-black material ground, bone and ash structure, and one restrained signal accent.
- Angular cuts and interrupted frames instead of rounded glass cards.
- Emissive pixels remain a minority of the composition.
- No fake telemetry, generated lettering, neural-network diagrams, glowing orb dashboards, or cyan-violet SaaS styling.

## Deterministic field

`ProceduralField.tsx` renders a seeded low-resolution canvas. It combines:

- bounded Lorenz-derived trajectories;
- stepped line segments rather than smooth curves;
- 4x4 Bayer ordered dithering;
- seeded material blocks and scar lines;
- project-specific accent palettes;
- static fallback under reduced-motion preference.

The same seed and viewport class must reproduce the same composition. Animation may change a small signal phase only; it must not change layout or obscure content.

## Evidence boundary

Procedural fields are labeled and treated as `STUDIO_GENERATED_FRAMING`. They never replace:

- current screenshots;
- device captures;
- project-owned key art;
- runtime visual acceptance;
- provenance requirements.

## Visual inspection loop

1. Render desktop, tablet, and mobile.
2. Inspect DOM geometry for clipping, overflow, overlap, and target size.
3. Capture raster output.
4. Inspect grayscale hierarchy and downsampled readability.
5. Compare accent-area ratio and large-area palette distribution.
6. Record the proof ceiling: build and browser geometry are not Cody's final taste approval.
