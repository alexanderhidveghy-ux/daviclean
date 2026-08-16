import type { Metadata } from "next";
import Link from "next/link";
import { services, site, testimonials } from "@/lib/site";
import { photo } from "@/lib/images";
import { ReviewList } from "@/components/sections";
import { CtaBand, SectionHead, Stars } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Referencie a hodnotenia",
  description:
    "Reálne hodnotenia zákazníkov Daviclean a ukážky realizácií — tepovanie sedačiek, matracov, interiérov áut, kancelárií a tlakové čistenie v Bratislave.",
  alternates: { canonical: `${site.url}/referencie` },
};

/** Galéria realizácií — fotky sa berú z /public/images/sluzby/<slug> */
const gallery = services.map((service) => ({
  src: photo(`sluzby/${service.slug}`),
  alt: service.title,
}));

export default function ReferencesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Referencie</span>
          </div>
          <h1>
            Referen<span style={{ color: "var(--blue)" }}>cie</span>
          </h1>
          <p className="lead">
            Viac ako 500 dokončených zákaziek v Bratislave a okolí — domácnosti, autá, kancelárie
            aj priestory po rekonštrukcii.
          </p>
          <div className="rating-box" style={{ maxWidth: 460 }}>
            <Stars />
            <div>
              <strong style={{ fontSize: 18 }}>5,0 / 5</strong>
              <span style={{ color: "var(--muted)", fontSize: 13, display: "block" }}>
                priemer z hodnotení zákazníkov
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Galéria" title="Ukážky" highlight="realizácií" />
          <div className="gallery-grid">
            {gallery.map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) * 70}>
                <figure className="gallery-item">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Hodnotenia"
            title="Čo hovoria"
            highlight="zákazníci"
            lead={`${testimonials.length} z posledných hodnotení. Ďalšie nájdete na našom Google profile a Facebooku.`}
          />
          <ReviewList />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <CtaBand
            title="Chcete podobný výsledok?"
            text="Napíšte nám, čo treba vyčistiť. Ponuku pripravíme bezplatne a nezáväzne."
          />
        </div>
      </section>
    </>
  );
}
