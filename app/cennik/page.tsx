import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { FaqList, PriceGrid } from "@/components/sections";
import { CtaBand, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cenník tepovania a čistenia",
  description:
    "Orientačný cenník Daviclean — tepovanie sedačiek od 45 €, matracov od 35 €, kobercov od 3 €/m², čistenie interiéru auta od 69 €, ozónovanie od 59 €. Cenu potvrdzujeme dopredu.",
  alternates: { canonical: `${site.url}/cennik` },
};

export default function PricingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Cenník</span>
          </div>
          <h1>
            Cen<span style={{ color: "var(--blue)" }}>ník</span>
          </h1>
          <p className="lead">
            Ceny nižšie sú orientačné — finálnu sumu potvrdíme dopredu podľa fotky alebo obhliadky.
            Čo si odsúhlasíme, to zaplatíte. Žiadne príplatky po dokončení práce.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <PriceGrid />

          <div className="price-note">
            <strong style={{ color: "var(--text)" }}>Doprava:</strong> v rámci Bratislavy zdarma
            pri objednávke nad 60 €, inak 10 €. Mimo Bratislavy 0,50 €/km od hranice mesta.
            <br />
            <strong style={{ color: "var(--text)" }}>Platba:</strong> v hotovosti, prevodom alebo
            faktúrou pre firmy. Platíte až po dokončení a kontrole práce.
            <br />
            <strong style={{ color: "var(--text)" }}>Minimálna objednávka:</strong> 40 € v rámci
            Bratislavy.
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Od čoho závisí cena"
            title="Prečo je cena"
            highlight="„od“"
            lead="Rovnako veľká sedačka môže znamenať hodinu alebo tri. Cenu ovplyvňuje najmä stupeň znečistenia, typ materiálu a dostupnosť."
          />
          <div className="info-grid">
            {[
              {
                title: "Stupeň znečistenia",
                text: "Bežná údržba je rýchla. Zaschnuté škvrny, moč či mastnota si vyžadujú predošetrenie a opakovanú extrakciu.",
              },
              {
                title: "Typ materiálu",
                text: "Bežná látka, mikroplyš, alcantara, koža alebo vlna — každý materiál má inú technológiu a chémiu.",
              },
              {
                title: "Rozsah zákazky",
                text: "Pri viacerých kusoch alebo väčších plochách cena za jednotku klesá. Firmám pripravíme paušál.",
              },
              {
                title: "Dostupnosť miesta",
                text: "Poschodie bez výťahu, obmedzený prístup k vode či elektrine alebo práca mimo pracovných hodín.",
              },
            ].map((item) => (
              <div className="card info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Otázky k" highlight="cenám a termínom" />
          <FaqList />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CtaBand
            title="Chcete presnú cenu?"
            text="Pošlite nám fotku toho, čo treba vyčistiť. Cenovú ponuku dostanete zvyčajne do pár hodín."
          />
        </div>
      </section>
    </>
  );
}
