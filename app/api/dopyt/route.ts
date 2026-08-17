import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Príjem dopytu z kontaktného formulára.
 *
 * Ak je nastavený RESEND_API_KEY, dopyt sa odošle e-mailom cez Resend.
 * Bez neho sa dopyt zapíše do logu servera (vhodné pri lokálnom vývoji).
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Neplatný formát požiadavky." }, { status: 400 });
  }

  // honeypot — vyplní ho iba robot
  if (text(body.web)) {
    return NextResponse.json({ message: "Ďakujeme za správu." });
  }

  const meno = text(body.meno);
  const telefon = text(body.telefon);
  const sprava = text(body.sprava);

  if (!meno || !telefon || !sprava) {
    return NextResponse.json(
      { error: "Vyplňte prosím meno, telefón a popis toho, čo treba vyčistiť." },
      { status: 400 },
    );
  }

  const kalkulacia = text(body.kalkulacia);

  const riadky = [
    `Meno: ${meno}`,
    `Telefón: ${telefon}`,
    `E-mail: ${text(body.email) || "—"}`,
    `Služba: ${text(body.sluzba) || "—"}`,
    `Miesto: ${text(body.miesto) || "—"}`,
    "",
    text(body.sprava),
    ...(kalkulacia ? ["", "--- Podklad z webu ---", kalkulacia] : []),
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[daviclean] Nový dopyt z webu:\n${riadky}`);
    return NextResponse.json({
      message:
        "Ďakujeme, dopyt sme prijali. Ozveme sa vám najneskôr do 24 hodín, zvyčajne ešte v ten istý deň.",
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? `Web Daviclean <web@daviclean.sk>`,
        to: [process.env.CONTACT_TO ?? site.email],
        reply_to: text(body.email) || undefined,
        subject: `Nový dopyt z webu — ${text(body.sluzba) || "čistenie"} (${meno})`,
        text: riadky,
      }),
    });

    if (!res.ok) throw new Error(await res.text());

    return NextResponse.json({
      message:
        "Ďakujeme, dopyt sme prijali. Ozveme sa vám najneskôr do 24 hodín, zvyčajne ešte v ten istý deň.",
    });
  } catch (error) {
    console.error("[daviclean] Odoslanie dopytu zlyhalo:", error);
    return NextResponse.json(
      { error: `Odoslanie zlyhalo. Napíšte nám prosím na ${site.email}.` },
      { status: 500 },
    );
  }
}
