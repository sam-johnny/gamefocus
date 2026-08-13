import Link from "next/link";
import { articleUrl, formatDate, type Article } from "@/lib/articles";

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "card card-featured" : "card"}>
      <Link href={articleUrl(article)} className="card-media">
        <img src={article.cover} alt={article.coverAlt} loading="lazy" />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <span className="chip">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min</span>
        </div>
        <h3 className="card-title">
          <Link href={articleUrl(article)}>{article.title}</Link>
        </h3>
        <p className="card-excerpt">{article.excerpt}</p>
        <span className="card-more">
          Lire l'article <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
