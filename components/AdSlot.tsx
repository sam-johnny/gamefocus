/**
 * Emplacement publicitaire — prêt pour Google AdSense ou autre régie.
 * Pour activer : remplacez le contenu par votre snippet AdSense
 * (script ins.adsbygoogle) et ajoutez le script global dans app/layout.tsx.
 */
export default function AdSlot({
  format = "leaderboard",
}: {
  format?: "leaderboard" | "rectangle" | "in-article";
}) {
  return (
    <div className={`ad-slot ad-${format}`} role="complementary" aria-label="Publicité">
      <span className="ad-label">ESPACE PUBLICITAIRE</span>
      <span className="ad-size">
        {format === "leaderboard" && "728 × 90"}
        {format === "rectangle" && "300 × 250"}
        {format === "in-article" && "In-article"}
      </span>
    </div>
  );
}
