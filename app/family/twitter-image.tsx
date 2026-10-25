import { renderOgImage } from "@/lib/og";

export const alt = "The Family: identity, virtues, and founding philosophy of Valmont Family";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    {
      eyebrow: "The Sovereign Family",
      title: "The Family",
      description: "Identity, founding purpose, the Ten Virtues, and the First Law",
    },
    size,
  );
}
