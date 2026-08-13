import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";
import { articles, getArticle, getArticlesByGame, articleUrl, formatDate, SITE } from "@/lib/articles";
import { getGame } from "@/lib/games";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ game: a.game, slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ game: string; slug: string }>;
}): Promise<Metadata> {
  const { game: gameSlug, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.game !== gameSlug) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: articleUrl(article) },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: ["Rédaction GameFocus"],
      images: [{ url: article.cover, width: 2048, height: 1080, alt: article.coverAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ game: string; slug: string }>;
}) {
  const { game: gameSlug, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.game !== gameSlug) notFound();
  const game = getGame(article.game);
  if (!game) notFound();

  // Maillage interne : priorité aux articles du même jeu (cocon sémantique)
  const related = [
    ...getArticlesByGame(article.game).filter((a) => a.slug !== article.slug),
    ...articles.filter((a) => a.game !== article.game),
  ].slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE.url}${article.cover}`,
    datePublished: article.date,
    dateModified: article.updatedAt,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "Rédaction GameFocus", url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}${articleUrl(article)}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: game.shortName, item: `${SITE.url}/${game.slug}/` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE.url}${articleUrl(article)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="article-page">
        <div className="container article-head">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
            <span aria-hidden="true"> / </span>
            <Link href={`/${game.slug}/`}>{game.shortName}</Link>
            <span aria-hidden="true"> / </span>
            <span>{article.category}</span>
          </nav>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span>Rédaction GameFocus</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>MAJ {formatDate(article.updatedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} min de lecture</span>
          </div>
        </div>

        <div className="container">
          <figure className="article-cover">
            <img src={article.cover} alt={article.coverAlt} fetchPriority="high" />
          </figure>
        </div>

        <div className="container article-layout">
          <div className="article-main">
            <aside className="keypoints" aria-label="L'essentiel de l'article">
              <p className="keypoints-title">L'essentiel</p>
              <ul>
                {article.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </aside>

            <ArticleBody blocks={article.blocks} />

            <AdSlot format="in-article" />

            <section className="faq" aria-label="Questions fréquentes">
              <h2 className="faq-title">Questions fréquentes</h2>
              {article.faq.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          </div>

          <aside className="article-aside">
            <AdSlot format="rectangle" />
            <div className="aside-box">
              <p className="aside-title">Dossier {game.shortName}</p>
              <p className="aside-text">
                Sortie le <strong>{game.releaseLabel}</strong> sur{" "}
                {game.platforms.join(" et ")}. {game.tagline}.
              </p>
              <Link href={`/${game.slug}/`} className="btn btn-primary btn-small">
                Tout le dossier {game.shortName}
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className="section related-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index">++</span>
              <h2 className="section-title">À lire ensuite</h2>
            </div>
          </Reveal>
          <div className="related-grid">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
