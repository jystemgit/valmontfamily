import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const paper = "#fafaf9";
const ink = "#111110";
const secondary = "#5f5f5b";
const muted = "#858580";
const line = "#dededb";
const lineDark = "#bdbdb8";

const fontDirectory = join(process.cwd(), "assets/fonts");
const emblemPromise = readFile(join(process.cwd(), "assets/valmont-emblem-og.png")).then(
  (data) => `data:image/png;base64,${data.toString("base64")}`,
);
const fontsPromise = Promise.all([
  readFile(join(fontDirectory, "Geist-Light.ttf")),
  readFile(join(fontDirectory, "Geist-Regular.ttf")),
  readFile(join(fontDirectory, "Geist-Medium.ttf")),
]);

export type OgImageContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export async function renderOgImage({ eyebrow, title, description }: OgImageContent, size: { width: number; height: number }) {
  const [[light, regular, medium], emblem] = await Promise.all([fontsPromise, emblemPromise]);
  const titleSize = title.length > 20 ? 80 : 92;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 40, background: paper, fontFamily: "Geist" }}>
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 60px",
            border: `1px solid ${line}`,
            borderRadius: 34,
            overflow: "hidden",
          }}
        >
          <svg width="620" height="620" viewBox="0 0 620 620" style={{ position: "absolute", right: -250, top: -40 }}>
            <circle cx="310" cy="310" r="304" fill="none" stroke={line} strokeWidth="1.5" strokeDasharray="3 9" />
            <circle cx="310" cy="310" r="240" fill="none" stroke={line} strokeWidth="1.5" />
            <circle cx="310" cy="310" r="166" fill="none" stroke={lineDark} strokeWidth="1.5" />
            <circle cx="310" cy="310" r="92" fill="none" stroke={ink} strokeWidth="1.5" />
            <circle cx="310" cy="310" r="5" fill={ink} />
          </svg>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={emblem} width={52} height={61} alt="" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: ink }}>
              <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: 2 }}>VALMONT</div>
              <div style={{ fontSize: 12, fontWeight: 400, letterSpacing: 4.6 }}>FAMILY</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div style={{ display: "flex", color: muted, fontSize: 16, fontWeight: 500, letterSpacing: 3.4, textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ display: "flex", marginTop: 18, color: ink, fontSize: titleSize, fontWeight: 300, letterSpacing: -titleSize * 0.06, lineHeight: 0.98 }}>{title}</div>
            <div style={{ display: "flex", marginTop: 24, maxWidth: 700, color: secondary, fontSize: 25, fontWeight: 400, letterSpacing: -0.4, lineHeight: 1.42 }}>{description}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 22, borderTop: `1px solid ${line}`, maxWidth: 760 }}>
            <div style={{ display: "flex", color: ink, fontSize: 20, fontWeight: 400 }}>The Sovereign Creates</div>
            <div style={{ display: "flex", color: muted, fontSize: 18, fontWeight: 400, letterSpacing: 0.4 }}>valmontfamily.com</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: light, style: "normal", weight: 300 },
        { name: "Geist", data: regular, style: "normal", weight: 400 },
        { name: "Geist", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
