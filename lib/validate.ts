// Validateurs partagés par lib/games.ts et lib/articles.ts.
// Toute erreur de contenu fait échouer le build avec un message explicite.

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function fail(file: string, message: string): never {
  throw new Error(`[content] ${file} : ${message}`);
}

export function requireString(raw: Record<string, unknown>, field: string, file: string): string {
  const value = raw[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `le champ « ${field} » doit être une chaîne non vide`);
  }
  return value;
}

export function requireStringArray(
  raw: Record<string, unknown>,
  field: string,
  file: string,
): string[] {
  const value = raw[field];
  if (!Array.isArray(value) || value.length === 0 || !value.every((v) => typeof v === "string")) {
    fail(file, `le champ « ${field} » doit être un tableau de chaînes non vide`);
  }
  return value as string[];
}

export function optionalString(
  raw: Record<string, unknown>,
  field: string,
  file: string,
): string | undefined {
  const value = raw[field];
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    fail(file, `le champ « ${field} » doit être une chaîne`);
  }
  return value;
}
