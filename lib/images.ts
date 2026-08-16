import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

/**
 * Vráti cestu k reálnej fotke, ak v /public/images existuje.
 * Kým tam nie je, použije sa dočasný SVG placeholder s rovnakým názvom.
 *
 * Vďaka tomu stačí nakopírovať `hero.jpg` do /public/images a web ho začne
 * používať sám — netreba meniť žiadny kód.
 */
export function photo(name: string): string {
  const dir = path.join(process.cwd(), "public", "images");
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(dir, `${name}${ext}`))) return `/images/${name}${ext}`;
  }
  return `/images/${name}.svg`;
}
