import { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
} from "../lib/site";

type SeoProps = {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
  noindex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const ogImage = image || DEFAULT_OG_IMAGE;
    const fullTitle = title.includes("OpenHaus") ? title : `${title} | OpenHaus`;

    document.title = fullTitle;
    document.documentElement.lang = "pt-BR";

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertMeta("property", "og:type", path === "/" ? "website" : "article");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:secure_url", ogImage);
    upsertMeta("property", "og:image:alt", fullTitle);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const scriptId = "seo-jsonld";
    const previous = document.getElementById(scriptId);
    previous?.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}
