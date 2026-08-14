#!/usr/bin/env python3
"""Génère les visuels SVG synthwave / Vice City de NeonActu (1600x900).

Usage : python3 scripts/generate-images.py
Les fichiers sont écrits dans public/images/ (hero.svg, article-*.svg).
Aucune dépendance externe : uniquement la bibliothèque standard.
"""
import math
import random
import re
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)


def minify(t: str) -> str:
    """Allège le SVG sans changer le rendu : 1 décimale + couleur courte."""
    def rnd(m):
        v = float(m.group(0))
        r = round(v, 1)
        out = f"{r:.1f}"
        return out[:-2] if out.endswith(".0") else out
    t = re.sub(r"-?\d+\.\d+", rnd, t)
    return t.replace("#ffffff", "#fff")

W, H = 1600, 900


def palm_path(x, y, scale, flip=1, color="#12081f"):
    """Silhouette de palmier : tronc courbe + palmes."""
    parts = []
    # Tronc : courbe quadratique élargie
    trunk_w = 7 * scale
    bend = 34 * scale * flip
    height = 190 * scale
    top_x, top_y = x + bend, y - height
    parts.append(
        f'<path d="M {x - trunk_w} {y} '
        f"Q {x + bend * 0.35 - trunk_w * 0.4} {y - height * 0.55} {top_x - 3 * scale} {top_y} "
        f"L {top_x + 3 * scale} {top_y} "
        f"Q {x + bend * 0.35 + trunk_w * 0.4} {y - height * 0.55} {x + trunk_w} {y} Z\" fill=\"{color}\"/>"
    )
    # Palmes : feuilles en double arc autour du sommet
    n = 7
    for i in range(n):
        ang = (-160 + i * (140 / (n - 1))) if flip == 1 else (-20 - i * (140 / (n - 1)))
        rad = math.radians(ang)
        ln = (95 + 22 * math.sin(i * 1.7)) * scale
        ex, ey = top_x + math.cos(rad) * ln, top_y + math.sin(rad) * ln * 0.62
        mx, my = top_x + math.cos(rad) * ln * 0.5, top_y + math.sin(rad) * ln * 0.28 - 14 * scale
        w_leaf = 7.5 * scale
        # normale pour l'épaisseur
        dx, dy = ex - top_x, ey - top_y
        dl = math.hypot(dx, dy) or 1
        nx, ny = -dy / dl * w_leaf, dx / dl * w_leaf
        parts.append(
            f'<path d="M {top_x} {top_y} Q {mx + nx} {my + ny} {ex} {ey} '
            f'Q {mx - nx} {my - ny} {top_x} {top_y} Z" fill="{color}"/>'
        )
    # Coconuts
    parts.append(f'<circle cx="{top_x - 6 * scale}" cy="{top_y + 5 * scale}" r="{4 * scale}" fill="{color}"/>')
    parts.append(f'<circle cx="{top_x + 5 * scale}" cy="{top_y + 6 * scale}" r="{3.4 * scale}" fill="{color}"/>')
    return "\n".join(parts)


def skyline(seed, base_y, color, lit1="#ffd166", lit2="#6fe3ff", density=1.0, max_h=170):
    rnd = random.Random(seed)
    parts = []
    x = -20
    while x < W + 20:
        bw = rnd.randint(38, 110)
        bh = rnd.randint(int(40 * density), int(max_h * density))
        # toits variés : antenne ou terrasse
        roof = ""
        if rnd.random() < 0.35:
            roof = f'<rect x="{x + bw / 2 - 1.5}" y="{base_y - bh - 22}" width="3" height="22" fill="{color}"/>'
        parts.append(f'<rect x="{x}" y="{base_y - bh}" width="{bw}" height="{bh}" fill="{color}"/>{roof}')
        # fenêtres allumées
        for _ in range(int(bw * bh / 4200)):
            wx = x + rnd.randint(6, max(7, bw - 10))
            wy = base_y - rnd.randint(10, max(11, bh - 8))
            c = lit1 if rnd.random() < 0.7 else lit2
            o = rnd.uniform(0.35, 0.95)
            parts.append(f'<rect x="{wx}" y="{wy}" width="3.2" height="4.6" fill="{c}" opacity="{o:.2f}"/>')
        x += bw + rnd.randint(4, 26)
    return "\n".join(parts)


def sun_stripes_mask(mid, cx, cy, r):
    """Masque : le soleil est découpé en bandes horizontales de plus en plus espacées vers le bas."""
    stripes = []
    y = cy - r
    gap = 2.5
    band = 30.0
    while y < cy + r:
        stripes.append(f'<rect x="{cx - r - 4}" y="{y}" width="{2 * r + 8}" height="{band}" fill="#fff"/>')
        y += band + gap
        band *= 0.82
        gap *= 1.35
    return f'<mask id="{mid}"><rect x="0" y="0" width="{W}" height="{H}" fill="#000"/>{"".join(stripes)}</mask>'


def emblem(kind, cx, cy, s, glow, c1, c2):
    """Petit emblème néon par article, tracé en strokes lumineux."""
    g = []
    sw = 7 * s
    glow_attr = f'filter="url(#{glow})"'
    if kind == "calendar":
        w, h = 150 * s, 130 * s
        x, y = cx - w / 2, cy - h / 2
        g.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{14 * s}" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        g.append(f'<line x1="{x}" y1="{y + 34 * s}" x2="{x + w}" y2="{y + 34 * s}" stroke="{c1}" stroke-width="{sw * 0.7}" {glow_attr}/>')
        for rx in (x + w * 0.28, x + w * 0.72):
            g.append(f'<line x1="{rx}" y1="{y - 14 * s}" x2="{rx}" y2="{y + 18 * s}" stroke="{c2}" stroke-width="{sw}" stroke-linecap="round" {glow_attr}/>')
        for r in range(2):
            for cidx in range(4):
                px = x + 26 * s + cidx * 33 * s
                py = y + 58 * s + r * 34 * s
                col = c2 if (r == 1 and cidx == 2) else c1
                rad = 7.5 * s if (r == 1 and cidx == 2) else 5 * s
                g.append(f'<circle cx="{px}" cy="{py}" r="{rad}" fill="{col}" {glow_attr}/>')
    elif kind == "network":
        pts = [(0, -52), (-62, -12), (62, -12), (-34, 48), (34, 48)]
        pts = [(cx + px * s, cy + py * s) for px, py in pts]
        links = [(0, 1), (0, 2), (1, 3), (2, 4), (3, 4), (1, 2), (0, 3)]
        for a, b in links:
            g.append(f'<line x1="{pts[a][0]}" y1="{pts[a][1]}" x2="{pts[b][0]}" y2="{pts[b][1]}" stroke="{c1}" stroke-width="{sw * 0.55}" opacity="0.85" {glow_attr}/>')
        for i, (px, py) in enumerate(pts):
            g.append(f'<circle cx="{px}" cy="{py}" r="{11 * s if i == 0 else 8 * s}" fill="none" stroke="{c2 if i == 0 else c1}" stroke-width="{sw * 0.8}" {glow_attr}/>')
    elif kind == "duo":
        # deux silhouettes dos à dos
        for k, (dx, sc, col) in enumerate(((-46 * s, 1.0, c1), (46 * s, 0.88, c2))):
            hx, hy = cx + dx, cy - 52 * s * sc
            g.append(f'<circle cx="{hx}" cy="{hy}" r="{22 * s * sc}" fill="{col}" {glow_attr}/>')
            g.append(
                f'<path d="M {hx - 34 * s * sc} {cy + 56 * s * sc} '
                f'Q {hx - 36 * s * sc} {hy + 20 * s * sc} {hx} {hy + 16 * s * sc} '
                f'Q {hx + 36 * s * sc} {hy + 20 * s * sc} {hx + 34 * s * sc} {cy + 56 * s * sc} Z" fill="{col}" {glow_attr}/>'
            )
    elif kind == "pc":
        w, h = 170 * s, 105 * s
        x, y = cx - w / 2, cy - h / 2 - 10 * s
        g.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{8 * s}" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        g.append(f'<line x1="{cx - 26 * s}" y1="{y + h + 26 * s}" x2="{cx + 26 * s}" y2="{y + h + 26 * s}" stroke="{c1}" stroke-width="{sw}" stroke-linecap="round" {glow_attr}/>')
        g.append(f'<line x1="{cx}" y1="{y + h}" x2="{cx}" y2="{y + h + 26 * s}" stroke="{c1}" stroke-width="{sw * 0.8}" {glow_attr}/>')
        for i in range(3):
            g.append(f'<rect x="{x + 18 * s}" y="{y + 20 * s + i * 24 * s}" width="{(70 + 30 * math.sin(i * 2.1)) * s}" height="{7 * s}" rx="{3.5 * s}" fill="{c2}" opacity="{0.9 - i * 0.22}" {glow_attr}/>')
    elif kind == "play":
        r = 74 * s
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        tr = 34 * s
        g.append(
            f'<path d="M {cx - tr * 0.55} {cy - tr} L {cx + tr} {cy} L {cx - tr * 0.55} {cy + tr} Z" fill="{c2}" {glow_attr}/>'
        )
    return "\n".join(g)


def scene(
    fname,
    sky_stops,
    sun_c1,
    sun_c2,
    water_stops,
    glow_color,
    silhouette="#12081f",
    sun_cx=0.5,
    sun_r=200,
    seed=7,
    palms=(("L", 0.09, 1.15), ("R", 0.93, 0.95)),
    emblem_kind=None,
    horizon=0.66,
    star_alpha=0.8,
):
    horizon_y = H * horizon
    cx = W * sun_cx
    # soleil : bas posé sur l'horizon
    cy = horizon_y - sun_r * 0.42

    sky_grad = "".join(
        f'<stop offset="{o}" stop-color="{c}"/>' for o, c in sky_stops
    )
    water_grad = "".join(
        f'<stop offset="{o}" stop-color="{c}"/>' for o, c in water_stops
    )

    # étoiles (seulement dans le haut du ciel)
    rnd = random.Random(seed)
    stars = []
    for _ in range(48):
        sx, sy = rnd.uniform(0, W), rnd.uniform(0, horizon_y * 0.55)
        r = rnd.uniform(0.6, 1.9)
        o = rnd.uniform(0.15, star_alpha)
        stars.append(f'<circle cx="{sx:.0f}" cy="{sy:.0f}" r="{r:.1f}" fill="#ffffff" opacity="{o:.2f}"/>')

    # reflet du soleil sur l'eau
    refl = []
    ry = horizon_y + 16
    rw = sun_r * 0.5
    while ry < H - 10:
        o = max(0.04, 0.5 * (1 - (ry - horizon_y) / (H - horizon_y)))
        refl.append(
            f'<rect x="{cx - rw / 2:.0f}" y="{ry:.0f}" width="{rw:.0f}" height="5" rx="2.5" fill="{sun_c2}" opacity="{o:.2f}"/>'
        )
        ry += 16 + (ry - horizon_y) * 0.16
        rw *= 1.12

    # lignes d'horizon lumineuses sur l'eau
    water_lines = []
    for i in range(5):
        ly = horizon_y + 12 + i * 26
        water_lines.append(
            f'<rect x="0" y="{ly}" width="{W}" height="1.2" fill="{glow_color}" opacity="{0.10 - i * 0.016:.3f}"/>'
        )

    palms_svg = []
    for side, fx, sc in palms:
        px = W * fx
        py = H - 4
        palms_svg.append(palm_path(px, py, sc, flip=1 if side == "L" else -1, color=silhouette))

    emblem_svg = emblem(emblem_kind, W * 0.5, H * 0.41, 1.35, "glow", sun_c2, "#7df9ff") if emblem_kind else ""

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">{sky_grad}</linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">{water_grad}</linearGradient>
    <linearGradient id="sung" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{sun_c1}"/><stop offset="1" stop-color="{sun_c2}"/>
    </linearGradient>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    {sun_stripes_mask("sunmask", cx, cy, sun_r)}
  </defs>
  <rect width="{W}" height="{H}" fill="url(#sky)"/>
  {''.join(stars)}
  <circle cx="{cx}" cy="{cy}" r="{sun_r}" fill="url(#sung)" mask="url(#sunmask)" filter="url(#glow)"/>
  {skyline(seed, horizon_y, silhouette)}
  <rect x="0" y="{horizon_y}" width="{W}" height="{H - horizon_y}" fill="url(#water)"/>
  {''.join(water_lines)}
  {''.join(refl)}
  {emblem_svg}
  {''.join(palms_svg)}
</svg>'''
    (OUT / fname).write_text(minify(svg), encoding="utf-8")
    print(f"{fname}: {len(svg)/1024:.0f} Ko")


# ---------------------------------------------------------------- variants ---

scene(
    "hero.svg",
    sky_stops=[(0, "#1b0f3b"), (0.45, "#7a2b6d"), (0.75, "#e44a7c"), (1, "#ff8c5a")],
    sun_c1="#ffe27a", sun_c2="#ff2e88",
    water_stops=[(0, "#3a1354"), (1, "#0d0618")],
    glow_color="#ff7ac2",
    sun_cx=0.5, sun_r=210, seed=11,
    palms=(("L", 0.085, 1.25), ("R", 0.935, 1.0)),
    horizon=0.68,
)

scene(
    "article-guide.svg",
    sky_stops=[(0, "#2c1355"), (0.5, "#8f3470"), (0.8, "#e0685e"), (1, "#ffb36b")],
    sun_c1="#fff1a8", sun_c2="#ff7e4f",
    water_stops=[(0, "#3f1a57"), (1, "#120a20")],
    glow_color="#ffb36b",
    sun_cx=0.72, sun_r=160, seed=23,
    palms=(("L", 0.08, 1.05),),
    emblem_kind="calendar",
    horizon=0.7,
)

scene(
    "article-online.svg",
    sky_stops=[(0, "#04182e"), (0.5, "#0b3a54"), (0.8, "#14608c"), (1, "#2a9db5")],
    sun_c1="#d9fffb", sun_c2="#37c8ff",
    water_stops=[(0, "#0a2c4a"), (1, "#030b16")],
    glow_color="#5ee9ff",
    sun_cx=0.26, sun_r=150, seed=31,
    palms=(("R", 0.92, 1.1),),
    emblem_kind="network",
    horizon=0.68,
    star_alpha=0.95,
)

scene(
    "article-histoire.svg",
    sky_stops=[(0, "#191940"), (0.5, "#5c2a68"), (0.78, "#b04a7c"), (1, "#ff7d6e")],
    sun_c1="#ffd9a0", sun_c2="#ff5e7a",
    water_stops=[(0, "#331350"), (1, "#0e0719")],
    glow_color="#ff9ec7",
    sun_cx=0.68, sun_r=185, seed=47,
    palms=(("L", 0.07, 1.3), ("R", 0.95, 0.9)),
    emblem_kind="duo",
    horizon=0.67,
)

scene(
    "article-pc.svg",
    sky_stops=[(0, "#031d2c"), (0.5, "#07405f"), (0.78, "#0d7a8c"), (1, "#31c9b0")],
    sun_c1="#eafff7", sun_c2="#2fe6c8",
    water_stops=[(0, "#08304a"), (1, "#02121e")],
    glow_color="#5ff2d6",
    sun_cx=0.74, sun_r=150, seed=53,
    palms=(("L", 0.075, 1.0),),
    emblem_kind="pc",
    horizon=0.7,
)

scene(
    "article-trailer.svg",
    sky_stops=[(0, "#240b36"), (0.48, "#7a1e5a"), (0.78, "#d92b6b"), (1, "#ff6a3d")],
    sun_c1="#ffe9a8", sun_c2="#ff3d5e",
    water_stops=[(0, "#40114f"), (1, "#120618")],
    glow_color="#ff8ab0",
    sun_cx=0.5, sun_r=175, seed=67,
    palms=(("L", 0.09, 0.95), ("R", 0.92, 1.15)),
    emblem_kind="play",
    horizon=0.69,
)

print("OK")
