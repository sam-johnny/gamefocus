import Link from "next/link";
import { articles, articleUrl } from "@/lib/articles";
import { games } from "@/lib/games";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <p className="footer-title">NeonActu</p>
          <p className="footer-text">
            Le blog des joueurs impatients. Actualités, guides et analyses sur les
            jeux vidéo qui comptent — en ce moment, tout sur GTA 6.
          </p>
        </div>
        <nav className="footer-col" aria-label="Dossiers par jeu">
          <p className="footer-heading">Dossiers</p>
          {games.map((g) => (
            <Link key={g.slug} href={`/${g.slug}/`} className="footer-link">
              {g.shortName}
            </Link>
          ))}
        </nav>
        <nav className="footer-col" aria-label="Articles du footer">
          <p className="footer-heading">Derniers articles</p>
          {articles.slice(0, 4).map((a) => (
            <Link key={a.slug} href={articleUrl(a)} className="footer-link">
              {a.shortTitle}
            </Link>
          ))}
        </nav>
        <nav className="footer-col" aria-label="Liens du site">
          <p className="footer-heading">Le site</p>
          <Link href="/" className="footer-link">Accueil</Link>
          <Link href="/#articles" className="footer-link">Articles</Link>
          <Link href="/a-propos/" className="footer-link">À propos</Link>
        </nav>
      </div>
      <div className="footer-giant" aria-hidden="true">
        <span>NEONACTU</span>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 NeonActu — Tous droits réservés.</span>
        <span>
          GTA, Grand Theft Auto et Rockstar Games sont des marques de Take-Two
          Interactive. Site de fans, non affilié.
        </span>
      </div>
    </footer>
  );
}
