import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";
import { articles, getArticle, formatDate, SITE } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}/` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

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
    mainEntityOfPage: `${SITE.url}/articles/${article.slug}/`,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="article-page">
        <div className="container article-head">
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link>
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
              <p className="aside-title">Dossier GTA 6</p>
              <p className="aside-text">
                Sortie le <strong>19 novembre 2026</strong> sur PS5 et Xbox
                Series X|S. Précommandes ouvertes depuis le 25 juin.
              </p>
              <Link href="/" className="btn btn-primary btn-small">
                Suivre l'actu
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
