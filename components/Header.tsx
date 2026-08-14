import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { games } from "@/lib/games";

const NAV = [
  { href: "/", label: "Accueil" },
  ...games.map((g) => ({ href: `/${g.slug}/`, label: g.shortName })),
  { href: "/a-propos/", label: "À propos" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-meta container">
        <span>ÉDITION N°02</span>
        <span className="header-meta-sep" aria-hidden="true">/</span>
        <span>15 AOÛT 2026</span>
        <span className="header-meta-sep" aria-hidden="true">/</span>
        <span>DOSSIERS GTA 6 × PALWORLD</span>
      </div>
      <div className="header-main container">
        <Link href="/" className="logo" aria-label="NeonActu — retour à l'accueil">
          <span className="logo-game">NEON</span>
          <span className="logo-focus">ACTU</span>
        </Link>
        <div className="header-actions">
          <nav className="main-nav" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
