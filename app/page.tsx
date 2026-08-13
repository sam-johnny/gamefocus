import Link from "next/link";
import Marquee from "@/components/Marquee";
import ParticleField from "@/components/ParticleField";
import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { articles } from "@/lib/articles";

export default function Home() {
  const [featured, ...rest] = articles;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/images/hero.jpg"
            alt="Une ville tropicale au bord de l'océan illuminée de néons verts, évoquant Vice City dans GTA 6"
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
          <ParticleField />
        </div>
        <div className="container hero-content">
          <p className="hero-kicker">Le blog des joueurs impatients</p>
          <h1 className="hero-title">
            <span className="hero-title-top">GAME</span>
            <span className="hero-title-script">l'actu en</span>
            <span className="hero-title-bottom">FOCUS</span>
          </h1>
          <p className="hero-sub">
            Nouveautés jeux vidéo, guides et analyses. En ce moment :
            dossier complet sur <strong>GTA 6</strong> — sortie, trailers,
            précommandes et rumeurs vérifiées.
          </p>
          <div className="hero-cta">
            <Link href={`/articles/${featured.slug}/`} className="btn btn-primary">
              Lire le guide GTA 6
            </Link>
            <Link href="#articles" className="btn btn-ghost">
              Tous les articles
            </Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <Marquee />

      {/* ================= COMPTE À REBOURS ================= */}
      <section className="section countdown-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index">01</span>
              <h2 className="section-title">Compte à rebours — GTA 6</h2>
              <span className="section-note">19 NOV. 2026 · PS5 · XBOX SERIES</span>
            </div>
            <Countdown />
          </Reveal>
        </div>
      </section>

      {/* ================= À LA UNE ================= */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index">02</span>
              <h2 className="section-title">À la une</h2>
              <span className="section-note">LE GUIDE DE RÉFÉRENCE</span>
            </div>
            <ArticleCard article={featured} featured />
          </Reveal>
        </div>
      </section>

      <div className="container">
        <AdSlot format="leaderboard" />
      </div>

      {/* ================= ARTICLES ================= */}
      <section className="section" id="articles">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index">03</span>
              <h2 className="section-title">Derniers articles</h2>
              <span className="section-note">DOSSIER GTA 6</span>
            </div>
          </Reveal>
          <div className="articles-grid">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 90} className={`grid-item grid-item-${i % 4}`}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUIVEZ-NOUS ================= */}
      <section className="section follow-section">
        <div className="container">
          <Reveal>
            <div className="follow-box">
              <p className="follow-kicker">Restez focus</p>
              <h2 className="follow-title">
                Le trailer 3 droppe ?
                <br />
                Vous le saurez en premier.
              </h2>
              <p className="follow-text">
                Ajoutez GameFocus à vos favoris et suivez-nous : chaque annonce
                Rockstar est décryptée dans l'heure.
              </p>
              <div className="follow-links">
                <a href="#" className="btn btn-primary" rel="noopener">X / Twitter</a>
                <a href="#" className="btn btn-ghost" rel="noopener">YouTube</a>
                <a href="#" className="btn btn-ghost" rel="noopener">TikTok</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
