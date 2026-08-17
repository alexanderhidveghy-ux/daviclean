/**
 * Obmedzenie prístupu podľa krajiny.
 *
 * Používa sa VÝHRADNE na endpointe s analýzou fotiek, ktorý volá platené API.
 * Zvyšok webu zámerne zostáva dostupný odkiaľkoľvek — Googlebot totiž lezie
 * z amerických IP adries a blokovanie mimo SR by web vyradilo z vyhľadávania.
 *
 * Krajinu určuje Vercel z IP adresy a posiela ju v hlavičke `x-vercel-ip-country`.
 */

/** Povolené krajiny sa dajú rozšíriť bez zásahu do kódu, napr. ALLOWED_COUNTRIES="SK,CZ" */
export function allowedCountries(): string[] {
  return (process.env.ALLOWED_COUNTRIES ?? "SK")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
}

export type GeoCheck = { allowed: true; country: string } | { allowed: false; country: string };

export function checkCountry(request: Request): GeoCheck {
  const country = (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    ""
  ).toUpperCase();

  // Lokálny vývoj: hlavička neexistuje, nemá zmysel blokovať sám seba.
  if (!country) {
    return { allowed: process.env.VERCEL !== "1", country: "neznáma" };
  }

  return { allowed: allowedCountries().includes(country), country };
}
