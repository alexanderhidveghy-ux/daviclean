#!/usr/bin/env node
/**
 * Vygeneruje fotky pre web pomocou AI a uloží ich do /public/images.
 *
 *   OPENAI_API_KEY=sk-...      node scripts/generate-images.mjs
 *   REPLICATE_API_TOKEN=r8_... node scripts/generate-images.mjs
 *
 * Voliteľne:
 *   node scripts/generate-images.mjs hero sluzby/tepovanie-matracov   # len vybrané
 *
 * Súbory sa uložia ako .jpg (resp. .png). Web ich začne používať automaticky —
 * `lib/images.ts` uprednostní reálnu fotku pred SVG placeholderom.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { IMAGES, STYLE } from "./prompts.mjs";

const OUT_DIR = path.join(process.cwd(), "public", "images");
const only = process.argv.slice(2);
const targets = only.length ? IMAGES.filter((i) => only.includes(i.name)) : IMAGES;

if (!targets.length) {
  console.error("Nenašiel som žiadny obrázok podľa zadaných názvov.");
  process.exit(1);
}

const SIZES = {
  openai: { "4:5": "1024x1536", "16:10": "1536x1024", "1:1": "1024x1024" },
  replicate: { "4:5": "4:5", "16:10": "16:9", "1:1": "1:1" },
};

async function viaOpenAI(item, apiKey) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: `${item.prompt}. ${STYLE}`,
      size: SIZES.openai[item.aspect] ?? "1536x1024",
      quality: "high",
      n: 1,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return { buffer: Buffer.from(json.data[0].b64_json, "base64"), ext: ".png" };
}

async function viaReplicate(item, token) {
  const res = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      input: {
        prompt: `${item.prompt}. ${STYLE}`,
        aspect_ratio: SIZES.replicate[item.aspect] ?? "16:9",
        output_format: "jpg",
        output_quality: 90,
      },
    }),
  });
  if (!res.ok) throw new Error(`Replicate ${res.status}: ${await res.text()}`);
  const json = await res.json();
  const url = Array.isArray(json.output) ? json.output[0] : json.output;
  if (!url) throw new Error(`Replicate nevrátil obrázok: ${JSON.stringify(json).slice(0, 300)}`);
  const file = await fetch(url);
  return { buffer: Buffer.from(await file.arrayBuffer()), ext: ".jpg" };
}

const openaiKey = process.env.OPENAI_API_KEY;
const replicateToken = process.env.REPLICATE_API_TOKEN;

if (!openaiKey && !replicateToken) {
  console.error(
    [
      "Chýba API kľúč. Nastavte jeden z nich a spustite znova:",
      "",
      "  export OPENAI_API_KEY=sk-...          # gpt-image-1",
      "  export REPLICATE_API_TOKEN=r8_...     # FLUX 1.1 pro",
      "",
      "Alebo si fotky vygenerujte ručne — zadania nájdete v scripts/prompts.mjs",
      "a uložte ich do public/images pod týmito názvami:",
      ...IMAGES.map((i) => `  ${i.name}.jpg   (${i.aspect})`),
    ].join("\n"),
  );
  process.exit(1);
}

const generator = openaiKey
  ? { name: "OpenAI gpt-image-1", run: (item) => viaOpenAI(item, openaiKey) }
  : { name: "Replicate FLUX 1.1 pro", run: (item) => viaReplicate(item, replicateToken) };

console.log(`Generujem ${targets.length} obrázkov cez ${generator.name}…\n`);

let ok = 0;
for (const item of targets) {
  process.stdout.write(`  ${item.name} … `);
  try {
    const { buffer, ext } = await generator.run(item);
    const file = path.join(OUT_DIR, `${item.name}${ext}`);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, buffer);
    console.log(`hotovo (${Math.round(buffer.length / 1024)} kB)`);
    ok += 1;
  } catch (error) {
    console.log(`ZLYHALO — ${error.message}`);
  }
}

console.log(`\nHotových ${ok} z ${targets.length}. Fotky sú v public/images, web ich použije automaticky.`);
if (ok) console.log("Tip: pred nasadením ich skomprimujte (napr. squoosh.app alebo `sharp`) na ~200 kB.");
