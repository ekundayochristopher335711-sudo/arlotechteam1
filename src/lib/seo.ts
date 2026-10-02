import { useEffect } from "react";

const BASE_URL = "https://arlotech.com.ng";
const SUFFIX = " | Arlotech: Web Design Nigeria";

function setMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({ title, description, path = "" }: { title: string; description: string; path?: string }) {
  useEffect(() => {
    const fullTitle = title + SUFFIX;
    const url = BASE_URL + path;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path]);
}
