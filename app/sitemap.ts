import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/family", changeFrequency: "monthly", priority: 0.9 },
  { path: "/chronicle", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    images: [absoluteUrl(`${path === "/" ? "" : path}/opengraph-image`)],
  }));
}
