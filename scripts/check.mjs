#!/usr/bin/env node
/**
 * Verificación del sitio estático VAIVÉN — L001-T004 (ampliada en L002-T014: íconos y redes sociales).
 * Solo módulos integrados de Node (Art. III): node:fs, node:path, node:url.
 * Sale con código ≠ 0 si cualquier validación falla.
 */
import { readFile, stat, readdir } from "node:fs/promises";
import { join, dirname, resolve, posix, sep } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://vaiven-landing.onrender.com";

const PAGES = [
  { file: "index.html", url: "/" },
  { file: "privacidad/index.html", url: "/privacidad/" },
  { file: "terminos/index.html", url: "/terminos/" },
  { file: "eliminar-cuenta/index.html", url: "/eliminar-cuenta/" },
  { file: "404.html", url: null },
];

const REQUIRED = [
  ...PAGES.map((p) => p.file),
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "docs/plantilla.html",
  "assets/css/styles.css",
  "assets/js/config.js",
  "assets/js/site.js",
];

const MAX_CSS = 30 * 1024;
const MAX_JS = 5 * 1024;
const MAX_IMG = 150 * 1024;
const MAX_TOTAL = 500 * 1024;

const errors = [];
const fail = (msg) => errors.push(msg);
const ok = (msg) => console.log(`[OK] ${msg}`);

function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Quita comentarios HTML sin expresiones regulares y repite hasta que no quede ninguno
// (CodeQL: js/bad-tag-filter, js/incomplete-multi-character-sanitization).
function stripComments(html) {
  let out = html;
  for (;;) {
    const start = out.indexOf("<!--");
    if (start === -1) return out;
    const end = out.indexOf("-->", start + 4);
    out = end === -1 ? out.slice(0, start) : out.slice(0, start) + out.slice(end + 3);
  }
}

// Escapa un texto para usarlo literal dentro de una expresión regular (los puntos de una URL no son «cualquier carácter»).
const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function walk(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const allFiles = await walk(BASE);
const relFiles = new Set(
  allFiles.map((f) => f.slice(BASE.length + 1).split(sep).join("/")),
);

async function readIfExists(rel) {
  if (!relFiles.has(rel)) return null;
  return readFile(join(BASE, ...rel.split("/")), "utf-8");
}

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z-]+)\s*=\s*"([^"]*)"/g)) out[m[1].toLowerCase()] = m[2];
  return out;
}

function resolveRef(pageFile, ref) {
  const clean = ref.split("#")[0].split("?")[0];
  if (!clean) return null;
  let p = clean.startsWith("/")
    ? clean.slice(1)
    : posix.join(posix.dirname(pageFile), clean);
  p = posix.normalize(p);
  if (p.endsWith("/") || p === "." || p === "") p = p.replace(/\/?$/, "/") + "index.html";
  return p.replace(/^\.\//, "");
}

const isExternal = (v) => /^(https?:)?\/\//i.test(v.trim());
const isMailto = (v) => /^mailto:/i.test(v.trim());

// 1. Archivos obligatorios (Art. IV, VIII.5, IX.2)
for (const rel of REQUIRED) {
  if (!relFiles.has(rel)) fail(`falta el archivo obligatorio: ${rel}`);
}
if (errors.length === 0) ok("archivos obligatorios presentes");

const template = await readIfExists("docs/plantilla.html");
const templateClean = template ? stripComments(template) : null;
const templateHeader = templateClean?.match(/<header[\s\S]*?<\/header>/i)?.[0];
const templateFooter = templateClean?.match(/<footer[\s\S]*?<\/footer>/i)?.[0];

const titles = new Map();

for (const page of PAGES) {
  const html = await readIfExists(page.file);
  if (!html) continue; // ya se reportó como faltante
  const where = page.file;
  const errorsBefore = errors.length;
  const clean = stripComments(html);
  const flat = normalize(clean);

  if (!/^<!doctype html>/i.test(html.trim())) fail(`${where}: falta <!doctype html>`);
  if (!/<html[^>]+lang="es-MX"/i.test(flat)) fail(`${where}: falta lang="es-MX"`);

  const title = flat.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) fail(`${where}: falta <title> o está vacío`);
  else {
    if (titles.has(title)) fail(`${where}: <title> repetido con ${titles.get(title)}`);
    else titles.set(title, where);
  }

  const desc = flat.match(/<meta name="description" content="([^"]*)"/i)?.[1]?.trim();
  if (!desc) fail(`${where}: falta meta description`);
  else if (desc.length > 155) fail(`${where}: description de ${desc.length} caracteres (máx. 155)`);

  if (page.url) {
    const canonical = flat.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
    const expected = `${SITE_URL}${page.url}`;
    if (canonical !== expected) fail(`${where}: canonical debe ser ${expected}`);
    const ogUrl = flat.match(/<meta property="og:url" content="([^"]*)"/i)?.[1];
    if (ogUrl !== expected) fail(`${where}: og:url debe ser ${expected}`);
  }

  for (const prop of ["og:title", "og:description", "og:type", "og:image"]) {
    if (!new RegExp(`<meta property="${prop}" content="[^"]+"`, "i").test(flat))
      fail(`${where}: falta ${prop}`);
  }
  if (!/<meta name="theme-color" content="#[0-9a-f]{6}"/i.test(flat))
    fail(`${where}: falta theme-color válido`);

  const h1s = flat.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length !== 1) fail(`${where}: debe tener exactamente un <h1> (tiene ${h1s.length})`);

  if (/<form[\s>]/i.test(flat)) fail(`${where}: contiene <form> (Art. II)`);
  if (/<\?/.test(flat)) fail(`${where}: contiene una instrucción de plantilla (<?) que no se procesa`);
  if (/<style[\s>]/i.test(flat)) fail(`${where}: contiene <style> en línea (Art. III: un solo archivo CSS)`);
  if (/\sstyle="/i.test(flat)) fail(`${where}: contiene el atributo style (bloqueado por la CSP)`);
  for (const m of clean.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script[^>]*>/gi)) {
    const a = attrs(`<script ${m[1]}>`);
    if (a.src) continue;
    if ((a.type ?? "").toLowerCase() === "application/ld+json") continue;
    if (m[2].trim()) fail(`${where}: contiene <script> en línea (bloqueado por la CSP)`);
  }

  if (!/<a class="skip-link" href="#contenido">/i.test(flat))
    fail(`${where}: falta el enlace «Saltar al contenido»`);
  if (!/<main id="contenido"/i.test(flat)) fail(`${where}: falta <main id="contenido">`);

  // Cabecera y pie idénticos a la plantilla (Art. IV.2)
  const header = clean.match(/<header[\s\S]*?<\/header>/i)?.[0];
  const footer = clean.match(/<footer[\s\S]*?<\/footer>/i)?.[0];
  if (!header) fail(`${where}: falta <header>`);
  else if (templateHeader && normalize(header) !== normalize(templateHeader))
    fail(`${where}: <header> no coincide con docs/plantilla.html`);
  if (!footer) fail(`${where}: falta <footer>`);
  else if (templateFooter && normalize(footer) !== normalize(templateFooter))
    fail(`${where}: <footer> no coincide con docs/plantilla.html`);

  // Imágenes: alt, dimensiones y archivo local existente
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    if (a.alt === undefined) fail(`${where}: imagen sin alt (${a.src ?? "sin src"})`);
    if (!a.width || !a.height) fail(`${where}: imagen sin width/height (${a.src ?? "sin src"})`);
    if (!a.src) {
      fail(`${where}: imagen sin src`);
      continue;
    }
    if (isExternal(a.src)) {
      fail(`${where}: imagen de otro dominio (${a.src}) — Art. VII`);
      continue;
    }
    const target = resolveRef(page.file, a.src);
    if (target && !relFiles.has(target)) fail(`${where}: imagen inexistente ${a.src} (ruta sensible a mayúsculas)`);
  }

  // Enlaces internos existentes
  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const href = a.href?.trim();
    if (!href) {
      fail(`${where}: enlace sin href`);
      continue;
    }
    if (href === "#") fail(`${where}: enlace provisional href="#"`);
    if (href.startsWith("#")) continue;
    if (isMailto(href)) {
      if (!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href))
        fail(`${where}: mailto inválido (${href})`);
      continue;
    }
    if (isExternal(href)) {
      if (!/noopener/.test(a.rel ?? "") || !/noreferrer/.test(a.rel ?? ""))
        fail(`${where}: enlace externo sin rel="noopener noreferrer" (${href})`);
      continue;
    }
    const target = resolveRef(page.file, href);
    if (target && !relFiles.has(target)) fail(`${where}: enlace interno roto ${href} → ${target}`);
  }

  // Íconos <use href="…svg#id">: el archivo local y el símbolo deben existir (Art. V.3, VII)
  for (const tag of html.match(/<use\b[^>]*>/gi) ?? []) {
    const ref = attrs(tag).href;
    if (!ref) {
      fail(`${where}: <use> sin href`);
      continue;
    }
    if (isExternal(ref)) {
      fail(`${where}: ícono de otro dominio (${ref}) — Art. VII`);
      continue;
    }
    const [file, id] = ref.split("#");
    const target = resolveRef(page.file, file);
    if (!target || !relFiles.has(target)) {
      fail(`${where}: ícono inexistente ${ref}`);
      continue;
    }
    const sprite = await readIfExists(target);
    if (!id || !new RegExp(`<symbol[^>]+id="${escapeRe(id)}"`).test(sprite ?? ""))
      fail(`${where}: el símbolo #${id} no existe en ${file}`);
  }

  // Hojas de estilo y scripts: locales y existentes
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    if (!/stylesheet|icon/i.test(a.rel ?? "")) continue;
    if (!a.href) continue;
    if (isExternal(a.href)) {
      fail(`${where}: recurso externo (${a.href}) — Art. III/VII`);
      continue;
    }
    const target = resolveRef(page.file, a.href);
    if (target && !relFiles.has(target)) fail(`${where}: recurso inexistente ${a.href}`);
  }
  for (const tag of html.match(/<script\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    if (!a.src) continue;
    if (isExternal(a.src)) {
      fail(`${where}: script externo (${a.src}) — Art. III/VII`);
      continue;
    }
    const target = resolveRef(page.file, a.src);
    if (target && !relFiles.has(target)) fail(`${where}: script inexistente ${a.src}`);
  }

  if (errors.length === errorsBefore) ok(where);
}

// 2. CSS: un solo archivo, sin recursos externos ni valores fuera de tokens
const css = (await readIfExists("assets/css/styles.css")) ?? "";
if (css) {
  const cssErrorsBefore = errors.length;
  if (/@import/i.test(css)) fail("styles.css: usa @import (no permitido)");
  for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const ref = m[1].trim();
    if (ref.startsWith("data:")) continue;
    if (isExternal(ref)) fail(`styles.css: recurso externo ${ref}`);
    else {
      const target = resolveRef("index.html", ref.startsWith("/") ? ref : `assets/css/${ref}`);
      if (target && !relFiles.has(target)) fail(`styles.css: recurso inexistente ${ref}`);
    }
  }
  if (errors.length === cssErrorsBefore) ok("styles.css sin recursos externos");
}

// 3. Tamaños (Art. VIII.4)
const published = [...relFiles].filter(
  (f) => !/^(\.github|\.opencode|specs|docs|scripts)\//.test(f) && !/\.md$/.test(f) && f !== "opencode.json",
);
let total = 0;
for (const rel of published) total += (await stat(join(BASE, ...rel.split("/")))).size;

const cssFiles = published.filter((f) => f.endsWith(".css"));
const jsFiles = published.filter((f) => f.endsWith(".js"));
const imgFiles = published.filter((f) => /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(f));

if (cssFiles.length !== 1) fail(`debe haber un solo archivo CSS (hay ${cssFiles.length}: ${cssFiles.join(", ")})`);
let cssSize = 0;
for (const f of cssFiles) cssSize += (await stat(join(BASE, ...f.split("/")))).size;
if (cssSize > MAX_CSS) fail(`CSS de ${Math.round(cssSize / 1024)} KB (máx. 30 KB)`);
else ok(`CSS: ${Math.round(cssSize / 1024)} KB`);

let jsSize = 0;
for (const f of jsFiles) jsSize += (await stat(join(BASE, ...f.split("/")))).size;
if (jsSize > MAX_JS) fail(`JS de ${Math.round(jsSize / 1024)} KB (máx. 5 KB)`);
else ok(`JS: ${Math.round(jsSize / 1024)} KB`);

for (const f of imgFiles) {
  const size = (await stat(join(BASE, ...f.split("/")))).size;
  if (size > MAX_IMG) fail(`${f}: ${Math.round(size / 1024)} KB (máx. 150 KB)`);
}
ok(`${imgFiles.length} imágenes ≤ 150 KB`);

if (total > MAX_TOTAL) fail(`peso publicado ${Math.round(total / 1024)} KB (máx. 500 KB)`);
else ok(`peso publicado: ${Math.round(total / 1024)} KB`);

// 4. robots.txt
const robots = (await readIfExists("robots.txt")) ?? "";
if (robots) {
  if (!/User-agent:\s*\*/i.test(robots)) fail("robots.txt: falta User-agent: *");
  if (!/Allow:\s*\//i.test(robots)) fail("robots.txt: falta Allow: /");
  if (!new RegExp(`Sitemap:\\s*${escapeRe(SITE_URL)}/sitemap\\.xml`, "i").test(robots))
    fail(`robots.txt: falta Sitemap: ${SITE_URL}/sitemap.xml`);
  else ok("robots.txt válido");
}

// 5. sitemap.xml
const sitemap = (await readIfExists("sitemap.xml")) ?? "";
if (sitemap) {
  if (!/<urlset[\s>]/.test(sitemap)) fail("sitemap.xml: falta <urlset>");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
  for (const page of PAGES.filter((p) => p.url)) {
    const expected = `${SITE_URL}${page.url}`;
    if (!locs.includes(expected)) fail(`sitemap.xml: falta ${expected}`);
  }
  if (locs.some((l) => l.endsWith("/404.html"))) fail("sitemap.xml: no debe incluir 404.html");
  ok(`sitemap.xml: ${locs.length} URL`);
}

// 6. _headers (Art. IX.2)
const headers = (await readIfExists("_headers")) ?? "";
if (headers) {
  const required = [
    [/X-Content-Type-Options:\s*nosniff/i, "X-Content-Type-Options: nosniff"],
    [/Referrer-Policy:\s*\S+/i, "Referrer-Policy"],
    [/Permissions-Policy:\s*\S+/i, "Permissions-Policy"],
    [/Content-Security-Policy:\s*[^\n]*default-src 'self'/i, "CSP default-src 'self'"],
    [/Content-Security-Policy:[^\n]*frame-ancestors 'none'/i, "CSP frame-ancestors 'none'"],
    [/Content-Security-Policy:[^\n]*form-action 'none'/i, "CSP form-action 'none'"],
  ];
  for (const [re, label] of required) if (!re.test(headers)) fail(`_headers: falta ${label}`);
  if (/unsafe-inline|unsafe-eval/i.test(headers)) fail("_headers: la CSP no debe permitir unsafe-inline ni unsafe-eval");
  if (!errors.some((e) => e.startsWith("_headers"))) ok("_headers con cabeceras de seguridad");
}

// 7. Redes sociales de la portada (Art. VII.2): cinco redes, íconos sin enlace roto y URLs de config.js válidas
const NETWORKS = {
  facebook: ["facebook.com", "www.facebook.com"],
  instagram: ["instagram.com", "www.instagram.com"],
  x: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"],
  youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
  tiktok: ["tiktok.com", "www.tiktok.com"],
};
const home = (await readIfExists("index.html")) ?? "";
if (home) {
  const socialErrors = errors.length;
  for (const net of Object.keys(NETWORKS)) {
    if (!new RegExp(`data-social="${net}"`).test(home)) fail(`index.html: falta el ícono de ${net} (data-social="${net}")`);
  }
  const cfg = (await readIfExists("assets/js/config.js")) ?? "";
  const social = cfg.match(/social:\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  for (const [net, hosts] of Object.entries(NETWORKS)) {
    const value = social.match(new RegExp(`\\b${net}:\\s*"([^"]*)"`))?.[1];
    if (value === undefined) {
      fail(`config.js: falta social.${net}`);
      continue;
    }
    if (value === "") continue; // sin URL todavía: el ícono queda sin enlace
    try {
      const u = new URL(value);
      if (u.protocol !== "https:" || !hosts.includes(u.hostname)) fail(`config.js: social.${net} debe ser https y del dominio de la red (${value})`);
    } catch {
      fail(`config.js: social.${net} no es una URL válida (${value})`);
    }
  }
  if (errors.length === socialErrors) ok("redes sociales: 5 íconos y URLs de config.js válidas");
}

// Resultado
if (errors.length > 0) {
  console.error(`\ncheck.mjs: ${errors.length} PROBLEMA(S)\n`);
  for (const e of errors) console.error(`  [FAIL] ${e}`);
  process.exit(1);
}
console.log("\ncheck.mjs: TODAS LAS VALIDACIONES PASARON ✓");
