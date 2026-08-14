import { getGame } from "@/lib/games";

/**
 * Layout des pages d'un jeu (hub + articles) : applique le thème du jeu
 * en surchargeant les variables CSS --accent* sur son périmètre.
 */
export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ game: string }>;
}) {
  const { game: gameSlug } = await params;
  const game = getGame(gameSlug);

  const style: Record<string, string> = {};
  if (game?.theme?.accent) style["--accent"] = game.theme.accent;
  if (game?.theme?.accent2) style["--accent-2"] = game.theme.accent2;
  if (game?.theme?.accentSoft) style["--accent-soft"] = game.theme.accentSoft;

  return (
    <div className="game-scope" style={style as React.CSSProperties}>
      {children}
    </div>
  );
}
