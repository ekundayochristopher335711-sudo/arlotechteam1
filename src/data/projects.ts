export type ProjectKind =
  | "food"
  | "realty"
  | "app"
  | "church"
  | "store"
  | "legal"
  | "apparel"
  | "photo"
  | "media"
  | "dash";

export type ProjectGroup = "Stores & brands" | "Web apps" | "Business & community" | "Creative & media";

export type Project = {
  title: string;
  category: string;
  group: ProjectGroup;
  kind: ProjectKind;
  /** bg = page colour, ink = text colour, accent = brand colour used in the preview */
  theme: { bg: string; ink: string; accent: string };
  highlight: string;
  about: string;
  built: string[];
  homepage?: boolean;
  previewImage?: string;
  /** Optional. A "Visit live site" button only shows if this is set. */
  href?: string;
};

export const projectGroups: ("All" | ProjectGroup)[] = [
  "All",
  "Stores & brands",
  "Web apps",
  "Business & community",
  "Creative & media",
];

export const projects: Project[] = [
  {
    title: "Breadwrapz",
    category: "Food & Lifestyle Brand",
    group: "Stores & brands",
    kind: "food",
    theme: { bg: "#FFF3E6", ink: "#3A1B05", accent: "#F26B1D" },
    highlight: "Fresh Nigerian meals delivered fast.",
    about:
      "Breadwrapz is a Nigerian food delivery brand serving wraps, rice meals, and combos with instant checkout, fast delivery, and easy tracking. The site is built to make ordering feel as good as the food itself, with a bold, appetising design and a smooth mobile experience.",
    built: [
      "Bold food-first homepage with real meal photography",
      "Menu section with categories, combos and descriptions",
      "Search bar and cart system for easy ordering",
      "Location and delivery tracking section",
      "Fast, mobile-optimised checkout experience",
    ],
    homepage: true,
    previewImage: "/previews/breadwrapz.png",
    href: "https://breadwrapz.vercel.app/",
  },
  {
    title: "Havenly",
    category: "Real Estate",
    group: "Business & community",
    kind: "realty",
    theme: { bg: "#EEF4F1", ink: "#0F2A24", accent: "#1F8A70" },
    highlight: "A property website built to turn browsers into viewings.",
    about:
      "Havenly is a website for a real estate company. It presents properties clearly, makes listings easy to browse on any phone, and gives buyers and renters a simple way to get in touch with an agent.",
    built: [
      "Property listings with clear photos and key details",
      "Simple search and browsing on mobile and desktop",
      "Enquiry and viewing-request contact points",
      "Trust-building layout for a real estate brand",
    ],
    homepage: true,
    previewImage: "/previews/havenly.png",
    href: "https://havenlyrealtors.vercel.app/",
  },
  {
    title: "Itan Clothing",
    category: "E-Commerce",
    group: "Stores & brands",
    kind: "store",
    theme: { bg: "#F3F1EE", ink: "#1C1917", accent: "#B4532A" },
    highlight: "A modern e-commerce store for a fashion brand.",
    about:
      "Itan Clothing is an online fashion store built for smooth browsing and easy checkout. The site showcases products with clean visuals, organised categories, and a mobile-first shopping experience that makes it easy for customers to find what they want and buy it fast.",
    built: [
      "Product catalogue with categories and filtering",
      "Clean product detail pages with image galleries",
      "Shopping cart and checkout flow",
      "Mobile-first responsive design",
      "Fast loading and smooth page transitions",
    ],
    homepage: true,
    previewImage: "/previews/itan-clothing.png",
    href: "https://itan-clothing.vercel.app/",
  },
  {
    title: "Olumide Adeyemi",
    category: "Professional Services",
    group: "Business & community",
    kind: "legal",
    theme: { bg: "#0F1B33", ink: "#F4EFE6", accent: "#C9A45C" },
    highlight: "A professional website for a law practice.",
    about:
      "This law practice website was built to establish credibility and make it easy for potential clients to get in touch. The design is clean and authoritative, exactly what you want when someone is deciding whether to trust you with a legal matter.",
    built: [
      "Professional, trust-building design",
      "Attorney profiles with portraits",
      "Practice area pages clearly explaining services offered",
      "Contact form and consultation booking section",
      "Fully responsive and fast-loading",
    ],
    homepage: true,
    previewImage: "/previews/olumideadeyemi.png",
    href: "https://olumideadeyemi.vercel.app/",
  },
  {
    title: "Aurum",
    category: "Web Application",
    group: "Web apps",
    kind: "app",
    theme: { bg: "#14110A", ink: "#F7EFD9", accent: "#E0B040" },
    highlight: "A web platform with secure sign-in and a focused dashboard.",
    about:
      "Aurum is a web application with a client-facing dashboard behind a secure login. We designed the interface to stay simple and easy to scan, and built it to run smoothly on both desktop and mobile.",
    built: [
      "Secure sign-in with a clean, distraction-free login page",
      "Client dashboard designed around the tasks people do most",
      "Responsive layouts for desktop and mobile",
      "Fast, reliable performance",
    ],
    homepage: true,
    previewImage: "/previews/aurum.png",
    href: "https://www.aurumite.com/",
  },
  {
    title: "LFCI Iworoko",
    category: "Community & Faith",
    group: "Business & community",
    kind: "church",
    theme: { bg: "#F1EEFB", ink: "#231A4A", accent: "#6C4DD6" },
    highlight: "A church website for community and outreach.",
    about:
      "Built for Living Faith Church Iworoko, this site serves as a hub for the congregation, sharing service times, events, and sermons. The design is welcoming and easy to navigate for members of all ages.",
    built: [
      "Service times, events, and announcements section",
      "Sermon and media section for online content",
      "Prayer request and contact forms",
      "Warm, community-focused design",
    ],
    previewImage: "/previews/lfciworoko.png",
    href: "https://lfciworoko.vercel.app/",
  },
  {
    title: "FYPP",
    category: "Apparel Brand",
    group: "Stores & brands",
    kind: "apparel",
    theme: { bg: "#FFF9DB", ink: "#111827", accent: "#2F5BEA" },
    highlight: "A campus apparel brand with a bold, youthful storefront.",
    about:
      "FYPP is an apparel brand for students and graduates. We built its website to feel energetic and current, showing the collection clearly and making it simple to browse on a phone.",
    built: [
      "Bold, youthful brand-led design",
      "Collection and product showcase",
      "Mobile-first browsing experience",
      "Fast page loads",
    ],
    previewImage: "/previews/fypp.png",
    href: "https://fyppng.vercel.app/",
  },
  {
    title: "SYB Photographers",
    category: "Photography Portfolio",
    group: "Creative & media",
    kind: "photo",
    theme: { bg: "#101012", ink: "#F2F2F2", accent: "#FF5A36" },
    highlight: "An interactive portfolio that puts the photography first.",
    about:
      "SYB Photographers needed a portfolio that lets the images do the talking. We built an interactive, orbit-style gallery with a striking hero portrait, and added a dark mode so the work looks great in any light.",
    built: [
      "Interactive orbit portfolio that showcases the photography",
      "Striking hero portrait and lens-inspired detail",
      "Dark mode",
      "Smooth, image-friendly performance",
    ],
    previewImage: "/previews/sybphotographers.png",
    href: "https://sybphotographers.vercel.app/",
  },
  {
    title: "The Kingdom Channel",
    category: "Faith & Media",
    group: "Creative & media",
    kind: "media",
    theme: { bg: "#0C1730", ink: "#F3F6FF", accent: "#F2B33D" },
    highlight: "A home for messages, teaching and media.",
    about:
      "The Kingdom Channel is a media-focused website that gives its audience one clear place to find messages and teaching content. The design keeps content front and centre and works well on any screen.",
    built: [
      "Content-first layout for messages and media",
      "Clear navigation for returning visitors",
      "Responsive design for phones, tablets and desktop",
    ],
    previewImage: "/previews/kingdomchannel.png",
    href: "https://kingdomchannel.vercel.app/",
  },
  {
    title: "AuraIQ",
    category: "Web Application",
    group: "Web apps",
    kind: "dash",
    theme: { bg: "#F4F1FF", ink: "#1E1B3A", accent: "#7A5CFA" },
    highlight: "A clean, data-friendly product interface.",
    about:
      "AuraIQ is a web product with a modern, data-friendly interface. We focused on clarity: readable layouts, sensible hierarchy, and a smooth experience across devices.",
    built: [
      "Clean product interface with clear hierarchy",
      "Responsive layouts for desktop and mobile",
      "Fast, smooth interactions",
    ],
    previewImage: "/previews/auraiq.png",
    href: "https://recalro.vercel.app/",
  },
];
