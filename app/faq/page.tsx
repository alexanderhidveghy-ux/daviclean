import type { Metadata } from "next";
import Link from "next/link";
import { faq, site } from "@/lib/site";
import { FaqList } from "@/components/sections";
import { CtaBand } from "@/components/ui";

export const metadata: Metadata = {
  title: "Časté otázky o tepovaní a čistení",
  description:
    "Odpovede na najčastejšie otázky — koľko stojí tepovanie sedačky, ako dlho schne čalúnenie, kam chodíme, aké prostriedky používame a ako často tepovať.",
  alternates: { canonical: `${site.url}/faq` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Časté otázky</span>
          </div>
          <h1>
            Časté <span style={{ color: "var(--blue)" }}>otázky</span>
          </h1>
          <p className="lead">
            Ceny, termíny, schnutie, bezpečnosť prostriedkov. Ak tu odpoveď nenájdete, zavolajte
            nám na {site.phone}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <FaqList />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
