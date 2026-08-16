import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { advantages, reasons, site, stats } from "@/lib/site";
import { AreaList } from "@/components/sections";
import { CtaBand, Icon, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "O nás — Daviclean",
  description:
    "Daviclean je tím profesionálneho čistenia z Bratislavy. Vlastná priemyselná technika, ekologická chémia a viac ako 500 spokojných zákazníkov.",
  alternates: { canonical: `${site.url}/o-nas` },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>O nás</span>
          </div>
          <h1>
            O nás <span style={{ color: "var(--blue)" }}>—</span> Daviclean
          </h1>
          <p className="lead">
            Sme tím, ktorý má rád viditeľné výsledky. Čistíme to, čo väčšina firiem odmietne —
            a robíme to tak, aby ste rozdiel videli na prvý pohľad.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap why-layout">
          <div>
            <span className="eyebrow">Náš príbeh</span>
            <h2 className="h2">
              Čistota, ktorá <span>je vidieť</span>
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              Daviclean vznikol z jednoduchej skúsenosti: väčšina ľudí si myslí, že špinavú
              sedačku alebo matrac treba vyhodiť. Pritom stačí správna technika a chémia — a kus
              nábytku vydrží ďalšie roky.
            </p>
            <p style={{ color: "var(--muted)" }}>
              Začali sme s tepovaním sedačiek a matracov v bratislavských domácnostiach. Dnes
              čistíme aj interiéry áut, kancelárie, terasy, fasády a robíme porealizačné čistenie
              po stavbách. Postupne sme investovali do vlastnej priemyselnej techniky, aby sme
              neboli závislí od požičovní a vedeli prísť rýchlo.
            </p>
            <p style={{ color: "var(--muted)" }}>
              Za výsledkom si stojíme. Ak niečo nedopadne podľa dohody, prídeme znova — bez
              doplatku. Rovnako otvorene vám dopredu povieme, ak sa škvrna nedá odstrániť úplne.
            </p>
            <ul className="reason-grid">
              {reasons.map((reason) => (
                <li key={reason}>
                  <Check /> {reason}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="card" style={{ padding: 32 }}>
              <span className="eyebrow">Kontaktná osoba</span>
              <h3 style={{ fontSize: 26, fontWeight: 800 }}>{site.contactPerson}</h3>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>{site.contactRole}</p>
              <p style={{ color: "var(--muted)", marginTop: 18, marginBottom: 0 }}>
                „Na obhliadku chodím osobne. Radšej poviem dopredu, čo sa dá a čo nie — zákazník
                tak vie, za čo platí, a nikto nie je na konci sklamaný.“
              </p>
            </div>

            <div className="stats-grid stats-centered" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="icon-badge">
                    <Icon name={stat.icon} />
                  </span>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Ako pracujeme"
            title="Naše"
            highlight="zásady"
            lead="Päť vecí, ktoré od nás môžete čakať pri každej zákazke — od bytu po firemné priestory."
          />
          <div className="adv-grid">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 60}>
                <div className="card adv-card">
                  <span className="icon-badge">
                    <Icon name={adv.icon} />
                  </span>
                  <h3>{adv.title}</h3>
                  <p>{adv.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Kde pôsobíme" title="Bratislava" highlight="a okolie" />
          <AreaList />
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
