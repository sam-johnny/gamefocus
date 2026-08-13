import type { MetadataRoute } from "next";
import { articles, articleUrl, SITE } from "@/lib/articles";
import { games } from "@/lib/games";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const gameEntries = games.map((g) => ({
    url: `${SITE.url}/${g.slug}/`,
    lastModified: "2026-08-13",
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));
  const articleEntries = articles.map((a) => ({
    url: `${SITE.url}${articleUrl(a)}`,
    lastModified: a.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    {
      url: SITE.url,
      lastModified: "2026-08-13",
      changeFrequency: "daily",
      priority: 1,
    },
    ...gameEntries,
    ...articleEntries,
    {
      url: `${SITE.url}/a-propos/`,
      lastModified: "2026-08-13",
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
