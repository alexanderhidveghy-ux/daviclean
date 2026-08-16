#!/usr/bin/env node
/**
 * Vygeneruje dočasné SVG placeholdery (logo, favicon, fotky) do /public.
 * Používajú sa dovtedy, kým do /public/images nepribudnú reálne fotky —
 * potom ich `lib/images.ts` automaticky uprednostní.
 *
 *   node scripts/generate-placeholders.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { IMAGES } from "./prompts.mjs";

const BLUE = "#1f8bff";
const BLUE_D = "#0a56c4";
const PUBLIC = path.join(process.cwd(), "public");

const mark = `
  <path d="M28 16h30c22.6 0 41 18.4 41 41s-18.4 41-41 41H28z" fill="url(#g)"/>
  <path d="M50 36h8c11.6 0 21 9.4 21 21s-9.4 21-21 21h-8z" fill="#05080d"/>
  <path d="M86 8 66 108h13L99 8z" fill="${BLUE}" opacity=".95"/>
`;

const gradient = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfe4ff"/>
</linearGradient></defs>`;

function write(relative, content) {
  const file = path.join(PUBLIC, relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, content);
  return relative;
}

/* favicon.png sa NEgeneruje — je to skutočná značka orezaná z public/logo 1 top.png */

write(
  "logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 128" width="520" height="128">${gradient}
  <rect width="520" height="128" fill="#05080d"/>
  <g transform="translate(8,0) scale(0.86)">${mark}</g>
  <text x="128" y="66" font-family="Bricolage Grotesque, Manrope, Arial, sans-serif" font-size="46" font-weight="800" letter-spacing="-2" fill="#ffffff">DAVI<tspan fill="${BLUE}">CLEAN</tspan></text>
  <text x="130" y="90" font-family="Inter Tight, Inter, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="7" fill="#6c7d92">PROFESIONÁLNE ČISTENIE</text>
</svg>`,
);

/** Placeholder fotky — tmavé pozadie v brandových farbách s názvom motívu. */
function placeholder(label, w, h) {
  const s = Math.min(w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16212e"/><stop offset="1" stop-color="#070c12"/>
    </linearGradient>
    <radialGradient id="glow" cx="74%" cy="16%" r="62%">
      <stop offset="0" stop-color="${BLUE}" stop-opacity=".40"/><stop offset="1" stop-color="${BLUE}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0v56" fill="none" stroke="#ffffff" stroke-opacity=".05"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g transform="translate(${w * 0.58} ${h * 0.3}) skewX(-12)" opacity=".2">
    <rect width="${w * 0.5}" height="${h * 0.16}" rx="8" fill="${BLUE_D}"/>
    <rect y="${h * 0.23}" width="${w * 0.34}" height="${h * 0.11}" rx="8" fill="${BLUE}"/>
  </g>
  <text x="${w * 0.07}" y="${h * 0.5}" font-family="Bricolage Grotesque, Manrope, Arial, sans-serif" font-size="${Math.round(s * 0.085)}" font-weight="800" letter-spacing="-1.5" fill="#ffffff">DAVI<tspan fill="${BLUE}">CLEAN</tspan></text>
  <text x="${w * 0.07}" y="${h * 0.62}" font-family="Inter Tight, Inter, Arial, sans-serif" font-size="${Math.round(s * 0.042)}" font-weight="600" fill="#8fa0b5">${label}</text>
  <text x="${w * 0.07}" y="${h * 0.9}" font-family="Inter Tight, Inter, Arial, sans-serif" font-size="${Math.round(s * 0.028)}" font-weight="600" letter-spacing="2.5" fill="#4d5c6d">MIESTO PRE FOTOGRAFIU</text>
</svg>`;
}

const LABELS = {
  hero: "Čistota, ktorá je vidieť",
  drawer: "Náš tím a technika",
  "sluzby/tepovanie-gaucov-a-sedaciek": "Tepovanie gaučov a sedačiek",
  "sluzby/tepovanie-matracov": "Tepovanie matracov",
  "sluzby/cistenie-kobercov": "Čistenie kobercov",
  "sluzby/cistenie-aut-interier": "Čistenie interiéru auta",
  "sluzby/odstranovanie-graffiti": "Odstraňovanie graffiti",
  "sluzby/tlakove-cistenie-dlazby-a-fasad": "Tlakové čistenie dlažby a fasád",
  "sluzby/ozonovanie-odstranenie-zapachu": "Ozónovanie priestorov",
  "sluzby/hlbkove-cistenie-kancelarii": "Hĺbkové čistenie kancelárií",
  "sluzby/porealizacne-stavebne-cistenie": "Porealizačné čistenie",
};

const created = IMAGES.map((item) => {
  const [w, h] = item.aspect === "4:5" ? [1000, 1250] : [1280, 800];
  return write(`images/${item.name}.svg`, placeholder(LABELS[item.name] ?? item.name, w, h));
});

console.log(["logo.svg", ...created].join("\n"));
