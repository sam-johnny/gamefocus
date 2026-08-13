import Link from "next/link";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/#articles", label: "Articles" },
  { href: "/a-propos/", label: "À propos" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-meta container">
        <span>ÉDITION N°01</span>
        <span className="header-meta-sep" aria-hidden="true">/</span>
        <span>13 AOÛT 2026</span>
        <span className="header-meta-sep" aria-hidden="true">/</span>
        <span>DOSSIER SPÉCIAL GTA 6</span>
      </div>
      <div className="header-main container">
        <Link href="/" className="logo" aria-label="GameFocus — retour à l'accueil">
          <span className="logo-game">GAME</span>
          <span className="logo-focus">FOCUS</span>
        </Link>
        <nav className="main-nav" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
