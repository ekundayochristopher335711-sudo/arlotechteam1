/**
 * All photography on the site is pulled from Unsplash (free to use under the Unsplash License).
 * To swap a photo, replace the `id` (the part after "photo-" in an images.unsplash.com URL).
 * The only images stored in this project are the team portraits in /public/logos.
 */
export type PhotoKey =
  | "bridge"
  | "bridgeWide"
  | "civic"
  | "boats"
  | "street"
  | "aerial"
  | "desk"
  | "code"
  | "monitor"
  | "java"
  | "gradient"
  | "dual"
  | "mug";

export const photos: Record<PhotoKey, { id: string; alt: string; credit: string }> = {
  bridge: {
    id: "1719314073622-9399d167725b",
    alt: "The Lekki-Ikoyi Link Bridge in Lagos",
    credit: "Tunde Buremo",
  },
  bridgeWide: {
    id: "1719314313652-d9835e0c52c3",
    alt: "A large cable-stayed bridge over the Lagos lagoon",
    credit: "Tunde Buremo",
  },
  civic: {
    id: "1618828665347-d870c38c95c7",
    alt: "The Lekki skyline in Lagos under a blue sky",
    credit: "Nupo Deyon Daniel",
  },
  boats: {
    id: "1765475467677-579353b25ce0",
    alt: "Boats on a wide river beside a modern city bridge in Lagos",
    credit: "Malik Buraimoh",
  },
  street: {
    id: "1649502913092-fb7f0e8fc632",
    alt: "A busy city street in Lagos",
    credit: "Namnso Ukpanah",
  },
  aerial: {
    id: "1569706971306-de5d78f6418e",
    alt: "Aerial view of Lagos",
    credit: "Namnso Ukpanah",
  },
  desk: {
    id: "1499951360447-b19be8fe80f5",
    alt: "A designer's desk with a laptop and monitor",
    credit: "Domenico Loia",
  },
  code: {
    id: "1498050108023-c5249f4df085",
    alt: "A laptop showing lines of code on a busy desk",
    credit: "Christopher Gower",
  },
  monitor: {
    id: "1547658719-da2b51169166",
    alt: "A monitor displaying digital products",
    credit: "Daniel Korpai",
  },
  java: {
    id: "1461749280684-dccba630e2f6",
    alt: "A monitor showing source code",
    credit: "Ilya Pavlov",
  },
  gradient: {
    id: "1558655146-d09347e92766",
    alt: "A desktop screen showing a colourful gradient",
    credit: "Balázs Kétyi",
  },
  dual: {
    id: "1487338875411-8880f74114a2",
    alt: "A two-monitor workstation",
    credit: "Tran Mau Tri Tam",
  },
  mug: {
    id: "1487014679447-9f8336841d58",
    alt: "A laptop on a desk beside a mug",
    credit: "Igor Miske",
  },
};

export const photoUrl = (key: PhotoKey, width: number) =>
  `https://images.unsplash.com/photo-${photos[key].id}?auto=format&fit=crop&q=72&w=${width}`;

/** Cover photo for each blog post (by slug). Posts uploaded from /admin use their own image instead. */
export const blogCovers: Record<string, PhotoKey> = {
  "professional-website-doubles-credibility": "desk",
  "why-small-business-needs-website-2026": "street",
  "10-seo-tips-that-work": "monitor",
  "choosing-right-domain-name": "java",
  "website-speed-matters": "bridgeWide",
  "ai-tools-every-entrepreneur-should-know": "dual",
};

const fallbackCovers: PhotoKey[] = ["code", "mug", "gradient", "aerial", "boats", "desk"];

export function coverFor(slug: string): PhotoKey {
  if (blogCovers[slug]) return blogCovers[slug];
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return fallbackCovers[hash % fallbackCovers.length];
}
