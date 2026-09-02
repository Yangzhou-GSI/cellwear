import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { SEO_BY_ROUTE, SEO_UPDATED, SITE_URL } from "./seo.config.mjs";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("styles.css", "dist/styles.css");
await cp("app.js", "dist/app.js");
await cp("public", "dist", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await cp(".openai/hosting.json", "dist/.openai/hosting.json");

const htmlEscape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const routeFromFile = (file) => {
  const path = relative(resolve("dist"), file).split(sep).join("/");
  return path === "index.html" ? "/" : `/${path.replace(/index\.html$/, "")}`;
};

const listHtml = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? listHtml(path) : [path];
    }),
  );
  return files.flat().filter((file) => file.endsWith(".html"));
};

const enhanceJsonLd = (html, seo) =>
  html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (script, value) => {
    try {
      const data = JSON.parse(value);
      const nodes = data["@graph"] || [data];
      for (const node of nodes) {
        if (node["@type"] === "BlogPosting") {
          const image = html.match(/<img[^>]+src="([^"]+)"/i)?.[1];
          node.description = seo.description;
          node.dateModified = SEO_UPDATED;
          node.inLanguage = "en-US";
          node.image = image?.startsWith("/") ? `${SITE_URL}${image}` : image;
          node.author = { "@type": "Organization", name: "Cellwear Education", url: `${SITE_URL}/education/` };
          node.publisher = { "@type": "Organization", name: "Cellwear", url: `${SITE_URL}/` };
          node.mainEntityOfPage = { "@type": "WebPage", "@id": `${SITE_URL}${seo.breadcrumbs.at(-1)[1]}` };
        }
        if (node["@type"] === "Organization") node["@id"] = `${SITE_URL}/#organization`;
      }
      return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
    } catch {
      return script;
    }
  });

for (const file of await listHtml(resolve("dist"))) {
  const route = routeFromFile(file);
  const seo = SEO_BY_ROUTE[route];
  if (!seo) throw new Error(`Missing SEO configuration for ${route}`);

  const canonical = `${SITE_URL}${route}`;
  let html = await readFile(file, "utf8");
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlEscape(seo.title)}</title>`)
    .replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${htmlEscape(seo.description)}" />`)
    .replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace(/\s*<!-- CELLWEAR SEO START -->[\s\S]*?<!-- CELLWEAR SEO END -->\s*/g, "\n")
    .replace(/<script type="application\/ld\+json" data-cellwear-seo>[\s\S]*?<\/script>/g, "");

  html = enhanceJsonLd(html, seo);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: seo.breadcrumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };

  const existingType = new RegExp(`"@type"\\s*:\\s*"${seo.type}"`).test(html);
  const pageSchema = existingType
    ? null
    : {
        "@context": "https://schema.org",
        "@type": seo.type,
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      };

  const websiteSchema = route === "/"
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Cellwear",
        alternateName: "Cellwear — See the Unseen",
        description: seo.description,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      }
    : null;

  const schemaScripts = [pageSchema, websiteSchema, route === "/" ? null : breadcrumbs]
    .filter(Boolean)
    .map((schema) => `<script type="application/ld+json" data-cellwear-seo>${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`)
    .join("\n");

  const metadata = `\n  <!-- CELLWEAR SEO START -->
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <meta name="author" content="Cellwear Education" />
  <meta property="og:site_name" content="Cellwear" />
  <meta property="og:type" content="${seo.type === "BlogPosting" ? "article" : "website"}" />
  <meta property="og:title" content="${htmlEscape(seo.title)}" />
  <meta property="og:description" content="${htmlEscape(seo.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${htmlEscape(seo.title)}" />
  <meta name="twitter:description" content="${htmlEscape(seo.description)}" />
  <link rel="alternate" type="application/rss+xml" title="Cellwear Journal" href="${SITE_URL}/feed.xml" />
  ${schemaScripts}
  <!-- CELLWEAR SEO END -->\n`;

  html = html.replace(/<\/head>/i, `${metadata}</head>`);
  await writeFile(file, html);
}
