import { renderOgImage } from "@/lib/og";

export const alt = "Valmont Family, The Sovereign Family";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    {
      eyebrow: "Official website",
      title: "The Sovereign Family",
      description: "A family institution dedicated to sovereignty, creation, and the legacy of generations",
    },
    size,
  );
}
