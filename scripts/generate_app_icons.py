#!/usr/bin/env python3
"""Deterministic app-icon raster for the studio mark.

Rebuilds the studio-mark geometry (dark ground, bone M glyph, coral triangle
from public/assets/studio-mark.svg) as PNG icons at the sizes the web app
manifest and iOS home screen need. No AI generation, no manual export: the
icons are reproducible from this script.

Outputs (committed):
  public/assets/studio-icon-512.png   (manifest, maskable-safe padding)
  public/assets/studio-icon-192.png   (manifest)
  public/assets/apple-touch-icon.png  (180x180, iOS)

Run: python3 scripts/generate_app_icons.py
"""

from PIL import Image, ImageDraw

GROUND = (36, 25, 20, 255)  # #241914
BONE = (238, 225, 191, 255)  # #eee1bf
CORAL = (238, 135, 101, 255)  # #ee8765


def flatten_quad(points, control, end, steps=48):
    start = points[-1]
    for i in range(1, steps + 1):
        t = i / steps
        x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control[0] + t ** 2 * end[0]
        y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control[1] + t ** 2 * end[1]
        points.append((x, y))


def glyph_outline():
    """The M glyph path from studio-mark.svg, flattened to a polygon."""
    points = [(10, 13), (19, 13), (19, 37)]
    flatten_quad(points, (19, 49), (27, 49))
    flatten_quad(points, (35, 49), (35, 37))
    points.append((35, 13))
    points.append((44, 13))
    points.append((44, 39))
    flatten_quad(points, (44, 58), (27, 58))
    flatten_quad(points, (10, 58), (10, 39))
    return points


def draw_icon(size, glyph_scale=1.0):
    """Draw at 4x supersample, then downscale for clean edges."""
    unit = size * 4 / 64
    canvas = Image.new("RGBA", (size * 4, size * 4), GROUND)
    draw = ImageDraw.Draw(canvas)

    def place(points):
        origin = 32  # glyph scale pivot: center of the 64-unit mark
        return [
            (
                (origin + (x - origin) * glyph_scale) * unit,
                (origin + (y - origin) * glyph_scale) * unit,
            )
            for x, y in points
        ]

    draw.polygon(place(glyph_outline()), fill=BONE)
    draw.polygon(place([(42, 10), (55, 19), (42, 28)]), fill=CORAL)
    return canvas.resize((size, size), Image.LANCZOS)


def main():
    draw_icon(512, glyph_scale=1.0).save("public/assets/studio-icon-512.png")
    draw_icon(192, glyph_scale=1.0).save("public/assets/studio-icon-192.png")
    # Maskable + iOS: glyph pulled toward center so launchers never clip it.
    draw_icon(512, glyph_scale=0.78).save("public/assets/studio-icon-512-maskable.png")
    draw_icon(180, glyph_scale=0.82).save("public/assets/apple-touch-icon.png")
    print("app icons written: 512, 192, 512-maskable, apple-touch 180")


if __name__ == "__main__":
    main()
