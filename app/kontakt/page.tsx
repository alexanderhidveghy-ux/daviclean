import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { AreaList } from "@/components/sections";
import { Icon, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kontakt — objednajte čistenie",
  description: `Objednajte profesionálne čistenie v Bratislave a okolí. Napíšte na ${site.email} alebo vyplňte formulár. Bezplatná cenová ponuka do 24 hodín.`,
  alternates: { canonical: `${site.url}/kontakt` },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Kontakt</span>
          </div>
          <h1>
            Objednať <span style={{ color: "var(--blue)" }}>čistenie</span>
          </h1>
          <p className="lead">
            Zavolajte alebo vyplňte formulár. Cenovú ponuku pripravíme bezplatne — ideálne
            priložte fotku toho, čo treba vyčistiť.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-layout">
          <div>
            <span className="eyebrow">Spojte sa s nami</span>
            <h2 className="h2">
              Kontaktné <span>údaje</span>
            </h2>
            <div className="contact-list">
              <a className="contact-row" href={`mailto:${site.email}`}>
                <span className="icon-badge">
                  <Icon name="mail" />
                </span>
                <span>
                  <small>E-mail</small>
                  <strong>{site.email}</strong>
                </span>
              </a>
              <div className="contact-row">
                <span className="icon-badge">
                  <Icon name="pin" />
                </span>
                <span>
                  <small>Pôsobnosť</small>
                  <strong>{site.region}</strong>
                </span>
              </div>
              <div className="contact-row">
                <span className="icon-badge">
                  <Icon name="calendar" />
                </span>
                <span>
                  <small>Otváracie hodiny</small>
                  <strong>{site.hours}</strong>
                </span>
              </div>
            </div>

            <div className="price-note" style={{ marginTop: 24 }}>
              <strong style={{ color: "var(--text)" }}>Fakturačné údaje:</strong> {site.legalName},{" "}
              {site.address.street}, {site.address.zip} {site.address.city}. IČO: {site.ico}, DIČ:{" "}
              {site.dic}.
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Kde pôsobíme"
            title="Bratislava"
            highlight="a okolie"
            lead="Vychádzame do 30 km od Bratislavy. Pri väčších zákazkách prídeme aj ďalej — stačí sa opýtať."
          />
          <AreaList />
        </div>
      </section>
    </>
  );
}
