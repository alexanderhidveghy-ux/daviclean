/**
 * Viacvrstvové obmedzenie volaní pre endpointy, ktoré stoja peniaze.
 *
 * Bráni trom scenárom naraz:
 *  1. rýchle klikanie jedného človeka  → minimálny odstup medzi volaniami
 *  2. jeden zneužívateľ                → hodinový a denný limit na IP
 *  3. distribuovaný nápor z viacerých IP → celkový denný strop
 *
 * POZOR: počítadlá žijú v pamäti procesu. Pri viacerých inštanciách
 * (Vercel serverless) limit platí len v rámci jednej inštancie — na
 * produkcii s reálnou návštevnosťou nasaďte Redis (napr. Upstash).
 * Celkový denný strop je tu práve preto, aby aj tak existoval tvrdý strop.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export type RateLimitRule = {
  /** minimálny odstup medzi dvoma volaniami z tej istej IP (ms) */
  minInterval: number;
  perHour: number;
  perDay: number;
  /** strop pre všetkých dokopy za deň */
  globalPerDay: number;
};

export const PHOTO_ANALYSIS_LIMITS: RateLimitRule = {
  minInterval: 15_000,
  perHour: 3,
  perDay: 10,
  globalPerDay: 200,
};

const perIp = new Map<string, number[]>();
let globalHits: number[] = [];

export type RateLimitResult =
  | { ok: true; zostava: number }
  | { ok: false; reason: string; retryAfter: number };

function prune(times: number[], now: number, window: number) {
  return times.filter((t) => now - t < window);
}

export function checkRateLimit(ip: string, rule: RateLimitRule): RateLimitResult {
  const now = Date.now();

  globalHits = prune(globalHits, now, DAY);
  if (globalHits.length >= rule.globalPerDay) {
    return {
      ok: false,
      reason:
        "Denný limit automatických analýz je vyčerpaný. Napíšte nám prosím, ponuku pripravíme ručne.",
      retryAfter: HOUR / 1000,
    };
  }

  const times = prune(perIp.get(ip) ?? [], now, DAY);

  const last = times[times.length - 1];
  if (last && now - last < rule.minInterval) {
    return {
      ok: false,
      reason: "Moment prosím — ďalšiu fotku vieme posúdiť o pár sekúnd.",
      retryAfter: Math.ceil((rule.minInterval - (now - last)) / 1000),
    };
  }

  if (prune(times, now, HOUR).length >= rule.perHour) {
    return {
      ok: false,
      reason:
        "Za poslednú hodinu ste vyčerpali limit analýz. Pošlite nám dopyt a ozveme sa s ponukou.",
      retryAfter: HOUR / 1000,
    };
  }

  if (times.length >= rule.perDay) {
    return {
      ok: false,
      reason: "Denný limit analýz je vyčerpaný. Napíšte nám a ponuku pripravíme ručne.",
      retryAfter: DAY / 1000,
    };
  }

  times.push(now);
  perIp.set(ip, times);
  globalHits.push(now);

  /* jednoduché upratanie, aby mapa nerástla donekonečna */
  if (perIp.size > 5_000) {
    for (const [key, value] of perIp) {
      if (!prune(value, now, DAY).length) perIp.delete(key);
    }
  }

  return { ok: true, zostava: Math.max(0, rule.perHour - prune(times, now, HOUR).length) };
}
