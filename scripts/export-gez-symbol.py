#!/usr/bin/env python3
"""One-off: export transparent symbol from flat logo JPEG."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [
    ROOT / "public/branding/gez-logo-source.jpg",
    Path(
        "/Users/selcukdemirci/.cursor/projects/"
        "Users-selcukdemirci-Desktop-GEZ-STUDIO-CURSOR-WEBSITEs-GEZSTUDIO/assets/"
        "Asset_10-8-d629db63-10b6-4203-947c-4d4bd7fd1f6b.png"
    ),
]
OUT = ROOT / "public/branding/gez-symbol.png"


def near_bg(rgb: tuple[int, int, int], bg: tuple[int, int, int], tol: int) -> bool:
    return sum(abs(rgb[i] - bg[i]) for i in range(3)) < tol


def main() -> None:
    src = next((p for p in SOURCES if p.exists()), None)
    if src is None:
        raise SystemExit("No logo source found")

    img = Image.open(src).convert("RGBA")
    w, h = img.size
    crop_h = int(h * 0.72)
    crop = img.crop((0, 0, w, crop_h))
    px = crop.load()
    cw, ch = crop.size
    bg = px[12, 12][:3]

    for y in range(ch):
        for x in range(cw):
            r, g, b, _ = px[x, y]
            rgb = (r, g, b)
            if near_bg(rgb, bg, 52):
                px[x, y] = (0, 0, 0, 0)
            elif near_bg(rgb, bg, 72):
                px[x, y] = (r, g, b, 80)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    crop.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({cw}x{ch}) from {src}")


if __name__ == "__main__":
    main()
