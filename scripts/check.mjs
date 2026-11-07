#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { stat, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_DIR = join(__dirname, "..");
const HTML_FILES = [
  "index.html",
  "privacidad/index.html",
  "terminos/index.html",
  "eliminar-cuenta/index.html",
  "404.html",
];

function normalize(s) {
  return (s || "").trim().replace(/\s+/g, " ");
}

async function getDirSize(dir) {
  let total = 0;
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) total += await getDirSize(fullPath);
      else if (entry.isFile()) {
        try { total += (await stat(fullPath)).size; } catch {}
      }
    }
  } catch {}
  return total;
}

async function run() {
  let allPass = true;
  const filesChecked = [];

  // 1. Verificar cada HTML - requisitos básicos
  for (const htmlFile of HTML_FILES) {
    const path = join(BASE_DIR, htmlFile);
    try {
      const html = await readFile(path, "utf-8");
      const content = normalize(html);
      filesChecked.push(htmlFile);
      let fileErrors = 0;

      // lang="es-MX"
      if (!/lang="es-MX"/.test(content) && !/lang='es-MX'/i.test(content)) {
        console.error(`[FAIL] ${htmlFile}: falta lang="es-MX"`);
        fileErrors++; allPass = false;
      }

      // <title> presente y no vacío
      const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
      if (!titleMatch) {
        console.error(`[FAIL] ${htmlFile}: falta <title>`);
        fileErrors++; allPass = false;
      } else if (titleMatch[1].trim().length === 0) {
        console.error(`[FAIL] ${htmlFile}: <title> vacío`);
        fileErrors++; allPass = false;
      }

      // meta description
      if (!/<meta name="description" content=/i.test(content)) {
        console.error(`[FAIL] ${htmlFile}: falta meta description`);
        fileErrors++; allPass = false;
      }

      // canonical
      if (!/<link rel="canonical" /i.test(content)) {
        console.error(`[FAIL] ${htmlFile}: falta canonical`);
        fileErrors++; allPass = false;
      }

      // <h1> presente
      if (!/<h1[^>]*>/.test(content)) {
        console.error(`[FAIL] ${htmlFile}: falta <h1>`);
        fileErrors++; allPass = false;
      }

      // alt en imágenes
      const imgMatches = content.match(/<img[^>]+>/g) || [];
      for (const img of imgMatches) {
        if (!/<img[^>]*alt=/.test(img) && !/<img[^>]+alt=/.test(img)) {
          console.error(`[FAIL] ${htmlFile}: imagen sin alt`);
          fileErrors++; allPass = false;
          break; // un error de imagen basta
        }
      }

      // sin <form>
      if (/<form/i.test(content)) {
        console.error(`[FAIL] ${htmlFile}: tiene elemento <form>`);
        fileErrors++; allPass = false;
      }

      // data-support-email en páginas legales (no en index provisional)
      if (htmlFile !== "index.html" && !/data-support-email/.test(content)) {
        console.error(`[FAIL] ${htmlFile}: falta data-support-email`);
        fileErrors++; allPass = false;
      }

      if (fileErrors === 0) {
        console.log(`[OK] ${htmlFile}`);
      }
    } catch (e) {
      // archivo que no existe aún - no es error
    }
  }

  // 2. Verificar tamaños de assets
  const assetsDir = join(BASE_DIR, "assets");
  const cssDir = join(assetsDir, "css");
  const jsDir = join(assetsDir, "js");
  const imgDir = join(assetsDir, "img");

  let cssSize = 0, jsSize = 0, imgSize = 0;

  try { cssSize = await getDirSize(cssDir); } catch {}
  try { jsSize = await getDirSize(jsDir); } catch {}
  try { imgSize = await getDirSize(imgDir); } catch {}

  if (cssSize > 30 * 1024) {
    console.error(`[FAIL] CSS > 30 KB: ${cssSize} bytes`);
    allPass = false;
  } else if (cssSize > 0) {
    console.log(`[OK] CSS: ${Math.round(cssSize / 1024)} KB`);
  } else {
    console.log("[OK] CSS: no encontrado (está bien para empezar)");
  }

  if (jsSize > 5 * 1024) {
    console.error(`[FAIL] JS > 5 KB: ${jsSize} bytes`);
    allPass = false;
  } else if (jsSize > 0) {
    console.log(`[OK] JS: ${Math.round(jsSize / 1024)} KB`);
  } else {
    console.log("[OK] JS: no encontrado (está bien para empezar)");
  }

  if (imgSize > 150 * 1024) {
    console.error(`[FAIL] Imágenes > 150 KB: ${imgSize} bytes`);
    allPass = false;
  } else if (imgSize > 0) {
    console.log(`[OK] Imágenes: ${Math.round(imgSize / 1024)} KB`);
  } else {
    console.log("[OK] Imágenes: none aún");
  }

  // 3. Verificar estructura común (cabecera y pie)
  try {
    const tmpl = await readFile(join(BASE_DIR, "docs", "plantilla.html"), "utf-8");
    const hasHeader = /<header[^>]*>/.test(tmpl);
    const hasFooter = /<footer[^>]*>/.test(tmpl);

    for (const htmlFile of HTML_FILES) {
      const path = join(BASE_DIR, htmlFile);
      try {
        const html = await readFile(path, "utf-8");
        if (hasHeader && !/<header/i.test(html)) {
          console.error(`[FAIL] ${htmlFile}: falta <header>`);
          allPass = false;
        }
        if (hasFooter && !/<footer/i.test(html)) {
          console.error(`[FAIL] ${htmlFile}: falta <footer>`);
          allPass = false;
        }
      } catch {}
    }
  } catch {}

  // Resultado
  if (allPass) {
    console.log("\ncheck.mjs: TODAS LAS VALIDACIONES PASARON ✓");
    process.exit(0);
  } else {
    console.log(`\ncheck.mjs: ALGUNAS VALIDACIONES FALLARON (ver arriba)`);
    console.log(`Archivos revisados: ${filesChecked.join(", ")}`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("check.mjs error inesperado:", e);
  process.exit(1);
});