import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";
import { Rich } from "@/components/ArticleBody";
import { games, getGame } from "@/lib/games";
import { getArticlesByGame, articleUrl, SITE } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ game: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string }>;
}): Promise<Metadata> {
  const { game: gameSlug } = await params;
  const game = getGame(gameSlug);
  if (!game) return {};
  return {
    title: `${game.shortName} : toute l'actu, guides et analyses`,
    description: game.description,
    keywords: game.keywords,
    alternates: { canonical: `/${game.slug}/` },
    openGraph: {
      type: "website",
      title: `${game.shortName} : toute l'actu, guides et analyses`,
      description: game.description,
      images: [{ url: game.cover, width: 2048, height: 1080, alt: game.coverAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game: gameSlug } = await params;
  const game = getGame(gameSlug);
  if (!game) notFound();

  const gameArticles = getArticlesByGame(game.slug);
  const [pillar, ...rest] = gameArticles;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${game.shortName} : toute l'actu, guides et analyses`,
    description: game.description,
    url: `${SITE.url}/${game.slug}/`,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: gameArticles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}${articleUrl(a)}`,
        name: a.title,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: game.shortName, item: `${SITE.url}/${game.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="hub-page">
        <div className="container article-head">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true"> / </span>
            <span>{game.shortName}</span>
          </nav>
          <h1 className="article-title">
            {game.shortName} : toute l&apos;actu, guides et analyses
          </h1>
        </div>

        <div className="container">
          <figure className="article-cover">
            <img src={game.cover} alt={game.coverAlt} fetchPriority="high" />
          </figure>
        </div>

        <div className="container article-layout">
          <div className="article-main">
            <div className="prose">
              {game.intro.map((paragraph, i) => (
                <p key={i}>
                  <Rich text={paragraph} />
                </p>
              ))}
            </div>
          </div>

          <aside className="article-aside">
            <div className="aside-box">
              <p className="aside-title">{game.shortName} en bref</p>
              <ul className="hub-facts">
                <li>
                  <span>Sortie</span>
                  <strong>{game.releaseLabel}</strong>
                </li>
                <li>
                  <span>Plateformes</span>
                  <strong>{game.platforms.join(" · ")}</strong>
                </li>
                <li>
                  <span>Articles</span>
                  <strong>{gameArticles.length}</strong>
                </li>
              </ul>
              {pillar && (
                <Link href={articleUrl(pillar)} className="btn btn-primary btn-small">
                  Lire le guide complet
                </Link>
              )}
            </div>
            <AdSlot format="rectangle" />
          </aside>
        </div>
      </div>

      {pillar && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="section-index">01</span>
                <h2 className="section-title">Le guide de référence</h2>
                <span className="section-note">À LIRE EN PREMIER</span>
              </div>
              <ArticleCard article={pillar} featured />
            </Reveal>
          </div>
        </section>
      )}

      <div className="container">
        <AdSlot format="leaderboard" />
      </div>

      {rest.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <span className="section-index">02</span>
                <h2 className="section-title">Tous les articles {game.shortName}</h2>
                <span className="section-note">{gameArticles.length} ARTICLES</span>
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
      )}
    </>
  );
}
