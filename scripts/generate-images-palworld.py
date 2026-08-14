#!/usr/bin/env python3
"""Génère les visuels SVG du dossier Palworld de NeonActu (1600x900).

Ambiance « îles Palpagos » : ciels turquoise/vert d'aube tropicale, collines
et îles flottantes en silhouette (à la place de la skyline urbaine), palmiers
et emblèmes néon propres au dossier (sphère, arbre-monde, balance, œuf,
patte, boussole). Réutilise les helpers de scripts/generate-images.py.

Usage : python3 scripts/generate-images-palworld.py
Les fichiers sont écrits dans public/images/ (palworld-hero.svg,
article-palworld-*.svg). Aucune dépendance externe.
"""
import importlib.util
import math
import random
from pathlib import Path

# Charge scripts/generate-images.py (nom de fichier non importable tel quel)
_src = Path(__file__).resolve().parent / "generate-images.py"
_spec = importlib.util.spec_from_file_location("generate_images", _src)
_gi = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_gi)

OUT = _gi.OUT
minify = _gi.minify
W, H = _gi.W, _gi.H
palm_path = _gi.palm_path
sun_stripes_mask = _gi.sun_stripes_mask


def emblem_pal(kind, cx, cy, s, glow, c1, c2):
    """Emblèmes néon du dossier Palworld, tracés en strokes lumineux."""
    g = []
    sw = 7 * s
    glow_attr = f'filter="url(#{glow})"'
    if kind == "sphere":
        # Sphère de capture : cercle, bande horizontale, bouton central
        r = 78 * s
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        g.append(f'<line x1="{cx - r}" y1="{cy}" x2="{cx + r}" y2="{cy}" stroke="{c1}" stroke-width="{sw * 0.8}" {glow_attr}/>')
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{17 * s}" fill="none" stroke="{c2}" stroke-width="{sw * 0.9}" {glow_attr}/>')
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{6.5 * s}" fill="{c2}" {glow_attr}/>')
        # demi-arc supérieur teinté
        g.append(f'<path d="M {cx - r * 0.72} {cy - r * 0.7} A {r * 1.02} {r * 1.02} 0 0 1 {cx + r * 0.72} {cy - r * 0.7}" fill="none" stroke="{c2}" stroke-width="{sw * 0.5}" opacity="0.8" {glow_attr}/>')
    elif kind == "tree":
        # Arbre-monde : tronc épais, canopée en cercles, fruits lumineux
        g.append(f'<path d="M {cx - 12 * s} {cy + 74 * s} Q {cx - 8 * s} {cy + 10 * s} {cx - 15 * s} {cy - 18 * s} L {cx + 15 * s} {cy - 18 * s} Q {cx + 8 * s} {cy + 10 * s} {cx + 12 * s} {cy + 74 * s} Z" fill="{c1}" {glow_attr}/>')
        for dx, dy, rr, col in ((-52, -52, 34, c1), (52, -52, 34, c1), (0, -72, 42, c2), (-28, -88, 26, c2), (30, -92, 24, c2)):
            g.append(f'<circle cx="{cx + dx * s}" cy="{cy + dy * s}" r="{rr * s}" fill="none" stroke="{col}" stroke-width="{sw * 0.55}" {glow_attr}/>')
        rnd = random.Random(5)
        for _ in range(9):
            ang = rnd.uniform(0, math.tau)
            rr = rnd.uniform(30, 78) * s
            px, py = cx + math.cos(ang) * rr * 0.9, cy - 62 * s + math.sin(ang) * rr * 0.45
            g.append(f'<circle cx="{px:.0f}" cy="{py:.0f}" r="{4.5 * s}" fill="{c2}" opacity="0.9" {glow_attr}/>')
    elif kind == "scale":
        # Balance de la justice
        top_y = cy - 62 * s
        g.append(f'<line x1="{cx}" y1="{top_y}" x2="{cx}" y2="{cy + 62 * s}" stroke="{c1}" stroke-width="{sw}" stroke-linecap="round" {glow_attr}/>')
        g.append(f'<line x1="{cx - 78 * s}" y1="{top_y + 12 * s}" x2="{cx + 78 * s}" y2="{top_y + 12 * s}" stroke="{c1}" stroke-width="{sw}" stroke-linecap="round" {glow_attr}/>')
        g.append(f'<circle cx="{cx}" cy="{top_y}" r="{8 * s}" fill="{c2}" {glow_attr}/>')
        for side in (-1, 1):
            px = cx + side * 78 * s
            py = top_y + 12 * s
            g.append(f'<line x1="{px}" y1="{py}" x2="{px - 26 * s}" y2="{py + 42 * s}" stroke="{c2}" stroke-width="{sw * 0.45}" {glow_attr}/>')
            g.append(f'<line x1="{px}" y1="{py}" x2="{px + 26 * s}" y2="{py + 42 * s}" stroke="{c2}" stroke-width="{sw * 0.45}" {glow_attr}/>')
            g.append(f'<path d="M {px - 30 * s} {py + 42 * s} A {30 * s} {30 * s} 0 0 0 {px + 30 * s} {py + 42 * s} Z" fill="none" stroke="{c2}" stroke-width="{sw * 0.6}" {glow_attr}/>')
        g.append(f'<line x1="{cx - 30 * s}" y1="{cy + 70 * s}" x2="{cx + 30 * s}" y2="{cy + 70 * s}" stroke="{c1}" stroke-width="{sw}" stroke-linecap="round" {glow_attr}/>')
    elif kind == "egg":
        # Œuf moucheté
        g.append(f'<path d="M {cx} {cy - 84 * s} C {cx + 56 * s} {cy - 60 * s} {cx + 62 * s} {cy + 10 * s} {cx + 40 * s} {cy + 48 * s} C {cx + 22 * s} {cy + 80 * s} {cx - 22 * s} {cy + 80 * s} {cx - 40 * s} {cy + 48 * s} C {cx - 62 * s} {cy + 10 * s} {cx - 56 * s} {cy - 60 * s} {cx} {cy - 84 * s} Z" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        for dx, dy, rr in ((-18, -30, 9), (20, -6, 12), (-14, 28, 11), (16, 44, 7), (6, -56, 6)):
            g.append(f'<circle cx="{cx + dx * s}" cy="{cy + dy * s}" r="{rr * s}" fill="{c2}" opacity="0.92" {glow_attr}/>')
    elif kind == "paw":
        # Empreinte de patte : coussinet + 4 doigts
        g.append(f'<path d="M {cx - 40 * s} {cy + 30 * s} C {cx - 40 * s} {cy + 74 * s} {cx + 40 * s} {cy + 74 * s} {cx + 40 * s} {cy + 30 * s} C {cx + 40 * s} {cy + 6 * s} {cx + 16 * s} {cy + 6 * s} {cx} {cy + 14 * s} C {cx - 16 * s} {cy + 6 * s} {cx - 40 * s} {cy + 6 * s} {cx - 40 * s} {cy + 30 * s} Z" fill="{c1}" {glow_attr}/>')
        for dx, dy in ((-48, -34), (-16, -52), (16, -52), (48, -34)):
            g.append(f'<circle cx="{cx + dx * s}" cy="{cy + dy * s}" r="{14 * s}" fill="{c2}" {glow_attr}/>')
    elif kind == "compass":
        # Boussole : cercle, rose des vents, aiguille
        r = 74 * s
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c1}" stroke-width="{sw}" {glow_attr}/>')
        for ang in (0, 90, 180, 270):
            rad = math.radians(ang)
            x1, y1 = cx + math.cos(rad) * r * 0.82, cy + math.sin(rad) * r * 0.82
            x2, y2 = cx + math.cos(rad) * r * 1.0, cy + math.sin(rad) * r * 1.0
            g.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c1}" stroke-width="{sw * 0.7}" stroke-linecap="round" {glow_attr}/>')
        g.append(f'<path d="M {cx} {cy - 48 * s} L {cx + 13 * s} {cy + 8 * s} L {cx} {cy + 48 * s} L {cx - 13 * s} {cy + 8 * s} Z" fill="{c2}" {glow_attr}/>')
        g.append(f'<circle cx="{cx}" cy="{cy}" r="{6 * s}" fill="{c1}" {glow_attr}/>')
    return "\n".join(g)


def hills(seed, base_y, color, glow_color):
    """Collines et îles flottantes en silhouette (remplace la skyline urbaine)."""
    rnd = random.Random(seed)
    parts = []
    # Collines : vagues de bosses arrondies le long de l'horizon
    x = -60
    layer = 0
    while x < W + 60:
        hw = rnd.randint(220, 460)
        hh = rnd.randint(30, 95)
        parts.append(
            f'<ellipse cx="{x + hw / 2}" cy="{base_y}" rx="{hw / 2}" ry="{hh}" fill="{color}"/>'
        )
        x += hw - rnd.randint(30, 90)
        layer += 1
    # Îles flottantes : blocs au-dessus de l'horizon
    for _ in range(4):
        ix = rnd.uniform(W * 0.08, W * 0.92)
        iy = rnd.uniform(H * 0.2, H * 0.48)
        iw = rnd.uniform(70, 150)
        ih = iw * 0.42
        parts.append(
            f'<path d="M {ix - iw / 2} {iy} Q {ix} {iy - ih * 0.7} {ix + iw / 2} {iy} '
            f'Q {ix + iw * 0.18} {iy + ih} {ix} {iy + ih * 1.5} '
            f'Q {ix - iw * 0.18} {iy + ih} {ix - iw / 2} {iy} Z" fill="{color}" opacity="0.9"/>'
        )
        # halo sous l'île
        parts.append(
            f'<ellipse cx="{ix}" cy="{iy + ih * 1.55}" rx="{iw * 0.28}" ry="6" fill="{glow_color}" opacity="0.35"/>'
        )
    return "\n".join(parts)


def scene_pal(
    fname,
    sky_stops,
    sun_c1,
    sun_c2,
    water_stops,
    glow_color,
    silhouette="#071a17",
    sun_cx=0.5,
    sun_r=200,
    seed=7,
    palms=(("L", 0.09, 1.15), ("R", 0.93, 0.95)),
    emblem_kind=None,
    emblem_c2="#d8fff2",
    horizon=0.66,
    star_alpha=0.8,
):
    horizon_y = H * horizon
    cx = W * sun_cx
    cy = horizon_y - sun_r * 0.42

    sky_grad = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in sky_stops)
    water_grad = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in water_stops)

    rnd = random.Random(seed)
    stars = []
    for _ in range(48):
        sx, sy = rnd.uniform(0, W), rnd.uniform(0, horizon_y * 0.55)
        r = rnd.uniform(0.6, 1.9)
        o = rnd.uniform(0.15, star_alpha)
        stars.append(f'<circle cx="{sx:.0f}" cy="{sy:.0f}" r="{r:.1f}" fill="#ffffff" opacity="{o:.2f}"/>')

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

    emblem_svg = (
        emblem_pal(emblem_kind, W * 0.5, H * 0.4, 1.35, "glow", sun_c2, emblem_c2)
        if emblem_kind
        else ""
    )

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
  {hills(seed, horizon_y, silhouette, glow_color)}
  <rect x="0" y="{horizon_y}" width="{W}" height="{H - horizon_y}" fill="url(#water)"/>
  {''.join(water_lines)}
  {''.join(refl)}
  {emblem_svg}
  {''.join(palms_svg)}
</svg>'''
    (OUT / fname).write_text(minify(svg), encoding="utf-8")
    print(f"{fname}: {len(svg)/1024:.0f} Ko")


# ---------------------------------------------------------------- variants ---

# Hub : aube tropicale turquoise, sphère de capture au centre
scene_pal(
    "palworld-hero.svg",
    sky_stops=[(0, "#062a33"), (0.45, "#0c5a5e"), (0.75, "#23a58c"), (1, "#a8e063")],
    sun_c1="#f4ffd8", sun_c2="#35e0c0",
    water_stops=[(0, "#0b4a4e"), (1, "#031413")],
    glow_color="#5ff2d6",
    sun_cx=0.5, sun_r=210, seed=101,
    palms=(("L", 0.085, 1.25), ("R", 0.935, 1.0)),
    horizon=0.68,
)

# News 1.0 : nuit cyan, l'arbre-monde
scene_pal(
    "article-palworld-1-0.svg",
    sky_stops=[(0, "#041f2e"), (0.5, "#0a4258"), (0.8, "#127a80"), (1, "#2fd0b0")],
    sun_c1="#eafffb", sun_c2="#2fc8ff",
    water_stops=[(0, "#093247"), (1, "#02121c")],
    glow_color="#5ee9ff",
    sun_cx=0.28, sun_r=160, seed=113,
    palms=(("R", 0.92, 1.1),),
    emblem_kind="tree",
    horizon=0.68,
    star_alpha=0.95,
)

# Procès Nintendo : ciel d'orage indigo/rouge, balance
scene_pal(
    "article-palworld-nintendo.svg",
    sky_stops=[(0, "#160b2e"), (0.5, "#3d1a4e"), (0.78, "#8c2a4e"), (1, "#e05545")],
    sun_c1="#ffd9c0", sun_c2="#ff4e5e",
    water_stops=[(0, "#2c1140"), (1, "#0d0616")],
    glow_color="#ff8a9a",
    sun_cx=0.72, sun_r=170, seed=131,
    palms=(("L", 0.08, 1.05),),
    emblem_kind="scale",
    emblem_c2="#ffd9c0",
    horizon=0.7,
)

# Guide débuter : matin vert tendre, boussole
scene_pal(
    "article-palworld-debuter.svg",
    sky_stops=[(0, "#0a2e26"), (0.5, "#135f4e"), (0.78, "#3aa06a"), (1, "#c4e86a")],
    sun_c1="#faffdf", sun_c2="#8bf06a",
    water_stops=[(0, "#0e4438"), (1, "#04130e")],
    glow_color="#a8f0a0",
    sun_cx=0.68, sun_r=185, seed=149,
    palms=(("L", 0.07, 1.3), ("R", 0.95, 0.9)),
    emblem_kind="compass",
    horizon=0.67,
)

# Élevage : crépuscule chaud rose/or, œuf moucheté
scene_pal(
    "article-palworld-elevage.svg",
    sky_stops=[(0, "#241238"), (0.48, "#6e2a5e"), (0.78, "#c0506a"), (1, "#ffb36b")],
    sun_c1="#fff1c8", sun_c2="#ff8e6e",
    water_stops=[(0, "#3c1747"), (1, "#110718")],
    glow_color="#ffb3c0",
    sun_cx=0.5, sun_r=175, seed=167,
    palms=(("L", 0.09, 0.95), ("R", 0.92, 1.15)),
    emblem_kind="egg",
    horizon=0.69,
)

# Meilleurs Pals : aube turquoise/vert, empreinte de patte
scene_pal(
    "article-palworld-pals.svg",
    sky_stops=[(0, "#052631"), (0.5, "#0d5258"), (0.78, "#2a9d7e"), (1, "#9fe86a")],
    sun_c1="#f0ffdd", sun_c2="#3fe0b8",
    water_stops=[(0, "#0b3d42"), (1, "#02100f")],
    glow_color="#6ef0c8",
    sun_cx=0.74, sun_r=150, seed=181,
    palms=(("L", 0.075, 1.0),),
    emblem_kind="paw",
    horizon=0.7,
)

print("OK")
