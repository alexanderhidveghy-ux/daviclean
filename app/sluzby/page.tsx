import type { Metadata } from "next";
import Link from "next/link";
import { categories, services } from "@/lib/site";
import { ServiceGrid } from "@/components/sections";
import { CtaBand, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Služby — tepovanie, čistenie a ozónovanie",
  description:
    "Kompletný prehľad služieb Daviclean: tepovanie sedačiek, matracov a kobercov, čistenie interiérov áut, hĺbkové čistenie kancelárií, tlakové čistenie, graffiti a stavebné čistenie.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Služby</span>
          </div>
          <h1>
            Naše <span style={{ color: "var(--blue)" }}>služby</span>
          </h1>
          <p className="lead">
            Šesť oblastí, jeden štandard. Vyberte si, čo potrebujete vyriešiť — ku každej službe
            nájdete postup, orientačnú cenu aj to, čo od nás môžete čakať.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const list = services.filter((s) => s.category === cat.key);
        if (!list.length) return null;
        return (
          <section className="section" id={cat.key} key={cat.key} style={{ scrollMarginTop: 130 }}>
            <div className="wrap">
              <SectionHead
                eyebrow={cat.brand}
                title={cat.label}
                lead={cat.description}
              />
              <ServiceGrid items={list} />
            </div>
          </section>
        );
      })}

      <section className="section">
        <div className="wrap">
          <CtaBand
            title="Nenašli ste svoju službu?"
            text="Zavolajte nám. Väčšinu neštandardných zákaziek vieme vyriešiť alebo odporučiť správny postup."
          />
        </div>
      </section>
    </>
  );
}
