import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PhotoQuote } from "@/components/photo-quote";
import { CtaBand, SectionHead } from "@/components/ui";
import { FaqList } from "@/components/sections";

export const metadata: Metadata = {
  title: "Cenová ponuka z fotky",
  description:
    "Odfoťte, čo treba vyčistiť, a hneď dostanete orientačnú cenu aj odhad trvania. Sedačky, matrace, koberce, interiéry áut, dlažby a fasády — Bratislava a okolie.",
  alternates: { canonical: `${site.url}/cenova-ponuka` },
};

const steps = [
  { title: "Odfoťte", text: "Priamo z mobilu alebo nahrajte fotku z počítača. Stačí jeden dobrý záber." },
  { title: "Posúdime", text: "Rozpoznáme materiál aj mieru znečistenia a priradíme správnu službu." },
  { title: "Dostanete odhad", text: "Orientačná cena a trvanie podľa nášho cenníka, hneď na obrazovke." },
  { title: "Potvrdíme", text: "Pošlete dopyt, my sa ozveme s presnou cenou a voľným termínom." },
];

export default function QuotePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Cenová ponuka</span>
          </div>
          <h1>
            Cenová ponuka <span style={{ color: "var(--blue)" }}>z fotky</span>
          </h1>
          <p className="lead">
            Odfoťte, čo potrebujete vyčistiť. Do pár sekúnd viete, o akú službu ide, ako je to
            znečistené a koľko to bude orientačne stáť — bez čakania na obhliadku.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <PhotoQuote />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead eyebrow="Postup" title="Ako to" highlight="prebieha" />
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div className="step" key={step.title}>
                <span className="step-num">{i + 1}</span>
                <h3 style={{ marginTop: 18 }}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Časté" highlight="otázky" />
          <FaqList />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CtaBand
            title="Radšej to preberiete osobne?"
            text="Napíšte nám bez fotky — spýtame sa na pár detailov a ponuku pripravíme rovnako rýchlo."
          />
        </div>
      </section>
    </>
  );
}
