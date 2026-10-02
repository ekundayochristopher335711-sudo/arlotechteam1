import type { IconName } from "../components/Icon";

export const site = {
  name: "Arlotech",
  email: "contact@arlotech.com.ng",
  whatsappNumber: "2348130444086",
  whatsappDisplay: "08130444086",
  whatsappUrl: "https://wa.me/2348130444086",
  linkedin: "https://www.linkedin.com/in/christopher-segun-648867406/",
  discord: "https://discord.com/users/1139159714765209724",
  location: "Lagos, Nigeria",
};

export const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const stats = [
  { value: "20+", label: "projects delivered" },
  { value: "15+", label: "happy clients" },
  { value: "2022", label: "building since" },
  { value: "24h", label: "to reply to you" },
];

export type Review = {
  id: string;
  name: string;
  business: string;
  rating: number | null;
  quote: string;
  image: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string | null;
};

export const audiences = [
  "Restaurants & food brands",
  "Law practices",
  "Churches & ministries",
  "Fashion & apparel",
  "Real estate",
  "Photographers & creatives",
  "Web apps & startups",
];

export const services: { title: string; summary: string; icon: IconName }[] = [
  {
    title: "Website Design & Development",
    summary: "Beautiful, responsive websites built for performance and a seamless user experience.",
    icon: "monitor",
  },
  {
    title: "Web Application Development",
    summary: "Custom web applications that solve real problems and scale with your business.",
    icon: "code",
  },
  {
    title: "E-Commerce Solutions",
    summary: "Online stores that are secure, fast, and built to convert visitors into customers.",
    icon: "cart",
  },
  {
    title: "UI/UX Design",
    summary: "Interfaces people enjoy using, designed with clarity, flow, and conversion in mind.",
    icon: "pen",
  },
  {
    title: "Brand & Visual Identity",
    summary: "Logos, colours, and visual systems that make your brand instantly recognisable.",
    icon: "palette",
  },
  {
    title: "SEO & Digital Marketing",
    summary: "Improve your visibility, attract the right audience, and grow your online presence.",
    icon: "pulse",
  },
  {
    title: "Speed & Performance",
    summary: "We audit and fix slow websites so they rank better and keep visitors from leaving.",
    icon: "bolt",
  },
  {
    title: "Ongoing Support",
    summary: "Updates, fixes, and security checks after launch, so your site stays healthy.",
    icon: "shield",
  },
];

export const quickSteps = [
  { title: "Discovery call", text: "A free call to understand your project and goals." },
  { title: "Design", text: "We design the look and layout. You review and give feedback." },
  { title: "Build", text: "We build the full thing with updates along the way." },
  { title: "Launch", text: "We test everything, go live, and stay on hand after launch." },
];

export const processSteps = [
  {
    title: "Discovery call",
    text: "We talk through your project: what you need, who it's for, and what success looks like. This call is free.",
  },
  {
    title: "Planning & quote",
    text: "We put together a clear plan with timeline, deliverables, and pricing. No surprises; you know exactly what you're getting.",
  },
  {
    title: "Design",
    text: "We design the look and feel of your site. You review it, give feedback, and we refine until you're happy.",
  },
  {
    title: "Development",
    text: "We build the real thing: clean code, fast pages, and a mobile-friendly experience. You get updates along the way.",
  },
  {
    title: "Review & testing",
    text: "We test everything across devices and browsers. You check it, request final changes, and sign off.",
  },
  {
    title: "Launch",
    text: "We take the site live. Domain, hosting, and SSL are all handled. Your site is out in the world.",
  },
  {
    title: "Handover & training",
    text: "We walk you through how to update content and manage your site. No tech knowledge needed.",
  },
  {
    title: "Ongoing support",
    text: "After launch we're still here. Updates, fixes, and changes are all covered.",
  },
];

export const stack = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Prisma"] },
  { title: "Hosting & tools", items: ["Vercel", "Netlify", "GitHub", "Cloudflare"] },
  { title: "Design", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"] },
];

export const team = [
  {
    name: "Christopher S.",
    role: "Lead Designer & Developer",
    image: "/logos/christopher.jpg",
    linkedin: site.linkedin,
    bio: "Christopher leads the design and frontend side of every project. He cares deeply about making things look great and work even better.",
    skills: ["Web Design", "Frontend Development", "Design Systems"],
  },
  {
    name: "Demilade (Grandtech)",
    role: "Full-Stack Developer",
    image: "/logos/grandtech.jpg",
    bio: "Demilade handles the technical backbone, building the logic, databases, and server-side parts that make websites and apps run reliably.",
    skills: ["Web Applications", "Backend Development", "Performance"],
  },
  {
    name: "Emmy Nuelo",
    role: "UI Designer & Content",
    image: "/logos/maya.jpg",
    bio: "Emmy focuses on user interface design and content, making sure every page is clear, readable, and guides visitors toward action.",
    skills: ["UI Design", "Accessibility", "Content Writing"],
  },
];

export const values = [
  {
    title: "We keep it simple",
    text: "We don't use jargon or make things more complicated than they need to be. You'll always know what we're building and why.",
  },
  {
    title: "You work with us directly",
    text: "No account managers, no handoffs. You speak directly with the person designing or building your site from day one.",
  },
  {
    title: "We build things that last",
    text: "We don't cut corners. Every site we build is clean, fast, and easy to maintain, so it keeps working long after launch.",
  },
];
