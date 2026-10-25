import { renderOgImage } from "@/lib/og";

export const alt = "Privacy at Valmont Family";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    {
      eyebrow: "The Sovereign Family",
      title: "Privacy",
      description: "How the public website handles information and protects private family records",
    },
    size,
  );
}
