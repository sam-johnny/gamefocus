import fs from "node:fs";
import path from "node:path";
import { isRecord, fail, requireString, requireStringArray, optionalString } from "@/lib/validate";

export type Game = {
  slug: string; // nom du dossier dans content/ (injecté par le loader)
  name: string;
  shortName: string;
  tagline: string;
  description: string; // meta SEO de la page hub
  intro: string[]; // paragraphes éditoriaux de la page hub
  cover: string;
  coverAlt: string;
  keywords: string[];
  releaseIso?: string; // date de sortie ISO, si connue
  releaseLabel: string;
  platforms: string[];
  // Thème optionnel : surcharge les variables CSS --accent* sur les pages du jeu.
  // Sans theme, le jeu hérite de la palette par défaut (noir forêt + néon lime).
  theme?: {
    accent?: string; // couleur principale (ex. "#ff4655")
    accent2?: string; // variante claire de l'accent
    accentSoft?: string; // fond translucide de l'accent (ex. "rgba(255, 70, 85, 0.12)")
  };
};

// ---------------------------------------------------------------------------
// Chargement et validation des jeux (content/<jeu>/_jeu.json)
// Le contenu est validé au build : toute erreur fait échouer la compilation.
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), "content");
const GAME_FILE = "_jeu.json"; // préfixe « _ » : ignoré par le loader d'articles

function validateGame(raw: unknown, slug: string, file: string): Game {
  if (!isRecord(raw)) fail(file, "le JSON doit être un objet");

  let theme: Game["theme"];
  if (raw.theme !== undefined) {
    if (!isRecord(raw.theme)) fail(file, "« theme » doit être un objet");
    theme = {
      accent: optionalString(raw.theme, "accent", file),
      accent2: optionalString(raw.theme, "accent2", file),
      accentSoft: optionalString(raw.theme, "accentSoft", file),
    };
  }

  return {
    slug,
    name: requireString(raw, "name", file),
    shortName: requireString(raw, "shortName", file),
    tagline: requireString(raw, "tagline", file),
    description: requireString(raw, "description", file),
    intro: requireStringArray(raw, "intro", file),
    cover: requireString(raw, "cover", file),
    coverAlt: requireString(raw, "coverAlt", file),
    keywords: requireStringArray(raw, "keywords", file),
    releaseIso: optionalString(raw, "releaseIso", file),
    releaseLabel: requireString(raw, "releaseLabel", file),
    platforms: requireStringArray(raw, "platforms", file),
    theme,
  };
}

/** Lit et valide tous les jeux définis dans content/<jeu>/_jeu.json. */
function loadGames(): Game[] {
  const loaded: Game[] = [];
  for (const slug of fs.readdirSync(CONTENT_DIR).sort()) {
    const gameDir = path.join(CONTENT_DIR, slug);
    if (!fs.statSync(gameDir).isDirectory()) continue;
    const gameFile = path.join(gameDir, GAME_FILE);
    if (!fs.existsSync(gameFile)) {
      fail(`${slug}/`, `définition du jeu manquante (${GAME_FILE})`);
    }
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(gameFile, "utf8"));
    } catch {
      fail(`${slug}/${GAME_FILE}`, "JSON invalide");
    }
    loaded.push(validateGame(raw, slug, `${slug}/${GAME_FILE}`));
  }
  return loaded;
}

export const games: Game[] = loadGames();

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
