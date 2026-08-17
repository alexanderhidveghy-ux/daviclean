import { NextResponse } from "next/server";
import { services } from "@/lib/site";
import { checkRateLimit, PHOTO_ANALYSIS_LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const SLUZBY = services
  .map((s) => `- ${s.title} (${s.priceFrom}, ${s.duration})`)
  .join("\n");

const PROMPT = `Si skúsený technik čistiacej firmy Daviclean z Bratislavy. Zákazník poslal fotku toho,
čo potrebuje vyčistiť. Posúď ju a odpovedz po slovensky.

Naše služby a orientačné ceny:
${SLUZBY}

Vráť iba JSON s týmito kľúčmi:
{
  "vhodne": true/false,          // false ak na fotke nie je nič, čo vieme čistiť
  "predmet": "čo je na fotke, vrátane materiálu ak sa dá určiť",
  "sluzba": "presný názov jednej z našich služieb vyššie, alebo prázdny reťazec",
  "znecistenie": "ľahké" | "stredné" | "silné" | "neviem posúdiť",
  "postreh": "2-3 vety: čo vidíš, čo bude treba riešiť a či sa to dá odstrániť úplne",
  "odhad": "cenový odhad podľa cenníka, napr. 'od 75 €'",
  "trvanie": "odhad trvania"
}

Buď triezvy a úprimný. Ak sa škvrna nemusí dať odstrániť úplne, napíš to.
Cenu neurčuj mimo nášho cenníka. Ak fotka nestačí na posúdenie, priznaj to
v poli "postreh" a do "znecistenie" daj "neviem posúdiť".`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Analýza fotiek nie je nastavená. Popíšte nám prosím zákazku slovami." },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "neznama";

  const limit = checkRateLimit(ip, PHOTO_ANALYSIS_LIMITS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.reason },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let image: string;
  let mime: string;
  try {
    const body = (await request.json()) as { image?: unknown; mime?: unknown };
    image = typeof body.image === "string" ? body.image : "";
    mime = typeof body.mime === "string" ? body.mime : "";
  } catch {
    return NextResponse.json({ error: "Neplatný formát požiadavky." }, { status: 400 });
  }

  if (!image) {
    return NextResponse.json({ error: "Chýba fotka." }, { status: 400 });
  }
  if (!ALLOWED.includes(mime)) {
    return NextResponse.json(
      { error: "Podporujeme formáty JPG, PNG a WEBP." },
      { status: 415 },
    );
  }
  // base64 je ~4/3 pôvodnej veľkosti
  if (image.length * 0.75 > MAX_BYTES) {
    return NextResponse.json({ error: "Fotka je príliš veľká (max 6 MB)." }, { status: 413 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5.4-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              { type: "image_url", image_url: { url: `data:${mime};base64,${image}`, detail: "low" } },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[daviclean] OpenAI zlyhalo:", res.status, detail.slice(0, 400));
      return NextResponse.json(
        { error: "Analýzu sa nepodarilo dokončiť. Popíšte nám zákazku slovami, ozveme sa." },
        { status: 502 },
      );
    }

    const json = await res.json();
    const raw = json.choices?.[0]?.message?.content;
    if (!raw) throw new Error("prázdna odpoveď");

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const text = (key: string) => (typeof parsed[key] === "string" ? (parsed[key] as string) : "");

    return NextResponse.json({
      zostava: limit.zostava,
      vhodne: parsed.vhodne !== false,
      predmet: text("predmet"),
      sluzba: text("sluzba"),
      znecistenie: text("znecistenie"),
      postreh: text("postreh"),
      odhad: text("odhad"),
      trvanie: text("trvanie"),
    });
  } catch (error) {
    console.error("[daviclean] Analýza fotky zlyhala:", error);
    return NextResponse.json(
      { error: "Analýzu sa nepodarilo dokončiť. Popíšte nám zákazku slovami, ozveme sa." },
      { status: 500 },
    );
  }
}
