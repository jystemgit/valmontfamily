type Pair = readonly [string, string];

type Seo = { title: string; description: string; keywords: readonly string[] };
type Intro = { eyebrow: string; title: string; description: string };
type Heading = { eyebrow: string; title: string; description?: string };

export type Dictionary = {
  site: {
    alternateName: string;
    description: string;
    keywords: readonly string[];
    category: string;
  };
  ui: {
    skip: string;
    homeAria: string;
    mainNav: string;
    mobileNav: string;
    footerNav: string;
    openNav: string;
    closeNav: string;
    language: string;
    languagePending: string;
    languageError: string;
    privacy: string;
    footerTagline: string;
  };
  nav: { home: string; family: string; chronicle: string };
  notFound: { eyebrow: string; title: string; description: string; cta: string };
  virtues: readonly string[];
  standards: readonly Pair[];
  principles: readonly Pair[];
  chronicles: readonly Pair[];
  home: {
    hero: {
      eyebrow: string;
      title: string;
      statement: string;
      ctaFamily: string;
      ringsTitle: string;
      rings: readonly [string, string, string];
      caption: string;
      principlesAria: string;
      principles: readonly Pair[];
    };
    philosophy: Heading & { body: readonly [string, string]; link: string };
    firstLaw: { eyebrow: string; quote: string; note: string };
    standard: Heading;
    closing: { eyebrow: string; title: string; text: string; cta: string };
  };
  family: {
    seo: Seo;
    intro: Intro;
    origins: Heading & { body: readonly [string, string] };
    mission: Pair;
    vision: Pair;
    sovereignty: Heading & { body: readonly [string, string] };
    virtues: Heading;
    principles: Heading;
    standard: Heading;
    stewardship: Heading & { body: readonly [string, string] };
    closing: { eyebrow: string; title: string; text: string };
  };
  chronicle: {
    seo: Seo;
    intro: Intro;
    memory: { eyebrow: string; quote: string };
    purpose: Heading & { body: readonly [string, string] };
    structure: Heading;
    statusLabel: string;
    status: string;
    closing: { eyebrow: string; title: string; text: string };
  };
  privacy: {
    seo: Seo;
    intro: Intro;
    sections: readonly Pair[];
  };
};
