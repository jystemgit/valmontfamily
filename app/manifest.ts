import type { MetadataRoute } from "next";
import { siteAlternateName, siteDescription, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} | ${siteAlternateName}`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "browser",
    background_color: "#fafaf9",
    theme_color: "#fafaf9",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
