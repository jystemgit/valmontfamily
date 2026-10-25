import { renderOgImage } from "@/lib/og";

export const alt = "The Chronicle: the institutional memory of Valmont Family";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    {
      eyebrow: "The Sovereign Family",
      title: "The Chronicle",
      description: "Knowledge not preserved is knowledge lost. Experience not recorded is experience wasted",
    },
    size,
  );
}
