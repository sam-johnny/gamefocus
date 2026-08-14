# GameFocus

Blog jeux vidéo en français, construit avec **Next.js 15** (App Router, export statique). Dossier de lancement : **GTA 6** — sortie, trailers, précommandes, histoire et analyses.

## Stack

- Next.js 15 + React 19 + TypeScript
- Export 100 % statique (`output: "export"`) — hébergeable partout (GitHub Pages, Cloudflare Pages, Netlify…)
- Aucune librairie UI : design system maison en CSS (`app/globals.css`)
- Thème clair/sombre automatique (suit le système, bascule manuelle mémorisée)
- Direction artistique propre à chaque dossier de jeu (GTA 6 : néons Vice City)
- Polices : Anton, Playfair Display, Inter, JetBrains Mono (via `next/font`)

## Commandes

```bash
npm install
npm run dev    # développement
npm run build  # build + export statique (résultat dans dist/)
```

> Note : si le build échoue avec « Build directory is not writeable » (montages FUSE), builder dans un dossier classique puis copier `dist/`.

## Structure

```
app/                  pages Next.js (App Router)
  page.tsx            accueil (hero, compte à rebours, articles)
  articles/[slug]/    page article (métadonnées + JSON-LD Article & FAQ)
  a-propos/           page à propos
  sitemap.ts          sitemap.xml généré
  robots.ts           robots.txt généré
  globals.css         design system complet
components/           Header, Footer, ThemeToggle, ArticleCard, Countdown,
                      Marquee, ParticleField, Reveal, AdSlot, ArticleBody
lib/articles.ts       contenu éditorial — AJOUTER UN ARTICLE ICI
public/images/        visuels SVG versionnés (scènes synthwave « Vice City »)
```

## Ajouter un article

1. Ajouter un objet dans `articles` (`lib/articles.ts`) : slug, titre, description SEO, blocs de contenu, FAQ, mots-clés.
2. Ajouter son visuel dans `public/images/`.
3. `npm run build` — la page, le sitemap et les métadonnées sont générés automatiquement.

## SEO embarqué

- Métadonnées + Open Graph + canonical par page
- JSON-LD : `WebSite` (global), `Article` + `FAQPage` (par article)
- `sitemap.xml` et `robots.txt` générés
- Export statique : HTML complet côté serveur, idéal pour les crawlers

## Publicité

Le composant `components/AdSlot.tsx` matérialise les emplacements (728×90, 300×250, in-article). Remplacer son contenu par le snippet AdSense (ou autre régie) et ajouter le script global dans `app/layout.tsx`.

---

Site de fans, non affilié à Rockstar Games / Take-Two Interactive.
