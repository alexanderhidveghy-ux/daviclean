import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  advantages,
  categories,
  pricing,
  reasons,
  services,
  site,
  stats,
  steps,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CtaBand, Icon, SectionHead, Stars } from "@/components/ui";
import {
  AreaList,
  FaqList,
  Marquee,
  PriceGrid,
  ReviewList,
  ServiceGrid,
} from "@/components/sections";
import { ContactForm } from "@/components/contact-form";
import { OrderButton } from "@/components/order-drawer";
import { photo } from "@/lib/images";

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <Reveal>
              <span className="eyebrow">Profesionálne čistenie</span>
              <h1>
                Čistota,
                <em>ktorá je vidieť.</em>
              </h1>
              <p className="hero-lead">
                Profesionálne hĺbkové čistenie pre váš domov, auto, kanceláriu aj exteriér.
                Prídeme s vlastnou technikou — vy sa nemusíte starať o nič.
              </p>
              <ul className="hero-checks">
                <li>
                  <Check /> Rýchlo
                </li>
                <li>
                  <Check /> Spoľahlivo
                </li>
                <li>
                  <Check /> Kvalitne
                </li>
              </ul>
              <div className="hero-actions">
                <OrderButton className="btn btn-primary">
                  Objednať čistenie <ArrowRight size={16} />
                </OrderButton>
                <a className="btn btn-ghost" href={`tel:${site.phoneHref}`}>
                  <Phone size={16} /> {site.phone}
                </a>
              </div>
              <p className="hero-place">
                <MapPin /> {site.region} · výjazd zvyčajne do 24 – 48 hodín
              </p>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={140}>
            <div className="hero-photo">
              {/* Kým v /public/images nie je hero.jpg, použije sa SVG placeholder */}
              <img src={photo("hero")} alt="Daviclean — hĺbkové čistenie sedačiek a interiérov" />
            </div>
            <div className="hero-badge">
              <ShieldCheck size={26} color="#52a8ff" />
              <div>
                <strong>500+</strong>
                <span>spokojných zákazníkov</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* pás kategórií pod hero */}
        <div className="wrap">
          <div className="cat-strip">
            {categories.slice(0, 5).map((cat, i) => (
              <Reveal key={cat.key} delay={i * 70}>
                <Link href={cat.href} className="card cat-card">
                  <span className="icon-badge">
                    <Icon name={cat.icon} />
                  </span>
                  <h3>{cat.label}</h3>
                  <p>{cat.tagline.replaceAll(" · ", ", ")}</p>
                  <span className="arrow">
                    Zobraziť <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Tepovanie sedačiek",
          "Matrace",
          "Koberce",
          "Interiéry áut",
          "Ozónovanie",
          "Tlakové čistenie",
          "Graffiti",
          "Kancelárie",
          "Po stavbe",
        ]}
      />

      {/* ---------------- SLUŽBY ---------------- */}
      <section className="section" id="sluzby">
        <div className="wrap">
          <SectionHead
            eyebrow="Naše služby"
            title="Čo pre vás"
            highlight="dokážeme"
            lead="Od tepovania sedačky v paneláku po tlakové čistenie fasády. Všetko s profesionálnou technikou a ekologickou chémiou."
            action={
              <Link className="btn btn-ghost btn-sm" href="/sluzby">
                Všetky služby <ArrowRight size={15} />
              </Link>
            }
          />
          <ServiceGrid items={services.slice(0, 8)} bento />
        </div>
      </section>

      {/* ---------------- VÝHODY + ČÍSLA ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
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

          <div className="stats-grid" style={{ marginTop: 16 }}>
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60}>
                <div className="stat">
                  <span className="icon-badge">
                    <Icon name={stat.icon} />
                  </span>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RADY ZNAČKY ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Rady služieb"
            title="Jedna značka,"
            highlight="šesť špecializácií"
            lead="Každý typ znečistenia potrebuje inú technológiu. Preto máme pre každú oblasť samostatný postup, techniku aj chémiu."
          />
          <div className="brand-grid">
            {categories.map((cat, i) => {
              const suffix = cat.brand.replace("DAVICLEAN", "").trim();
              return (
                <Reveal key={cat.key} delay={(i % 3) * 70}>
                  <Link href={cat.href} className="brand-card">
                    <div>
                      <div className="brand-name">
                        DAVI<span>CLEAN</span> <span>{suffix}</span>
                      </div>
                      <ul>
                        {cat.tagline.split(" · ").map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- AKO TO FUNGUJE ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Postup"
            title="Ako to"
            highlight="funguje?"
            lead="Štyri kroky od telefonátu po hotovú prácu. Platíte až po dokončení a kontrole výsledku."
          />
          <div className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <div className="step">
                  <span className="step-num">{i + 1}</span>
                  <Icon name={step.icon} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PREČO + RECENZIE ---------------- */}
      <section className="section">
        <div className="wrap why-layout">
          <div>
            <span className="eyebrow">Prečo Daviclean</span>
            <h2 className="h2">
              Prečo si vyberajú <span>práve nás</span>
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Nie sme brigádnická partia s požičaným tepovačom. Máme vlastnú priemyselnú techniku,
              overené postupy a za výsledkom si stojíme.
            </p>
            <ul className="reason-grid">
              {reasons.map((reason) => (
                <li key={reason}>
                  <Check /> {reason}
                </li>
              ))}
            </ul>
            <div className="rating-box">
              <Stars />
              <div>
                <strong style={{ fontSize: 18 }}>5,0 / 5</strong>
                <span style={{ color: "var(--muted)", fontSize: 13, display: "block" }}>
                  priemerné hodnotenie od zákazníkov
                </span>
              </div>
              <Link className="btn btn-ghost btn-sm" href="/referencie" style={{ marginLeft: "auto" }}>
                Referencie <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <ReviewList />
        </div>
      </section>

      {/* ---------------- CENNÍK (výber) ---------------- */}
      <section className="section section-alt" id="cennik">
        <div className="wrap">
          <SectionHead
            eyebrow="Cenník"
            title="Orientačné"
            highlight="ceny"
            lead="Cenu potvrdíme dopredu — stačí poslať fotku. Čo si odsúhlasíme, to zaplatíte. Žiadne príplatky po práci."
            action={
              <Link className="btn btn-ghost btn-sm" href="/cennik">
                Celý cenník <ArrowRight size={15} />
              </Link>
            }
          />
          <PriceGrid groups={pricing.slice(0, 3)} />
          <p className="price-note">
            Ceny sú uvedené vrátane dopravy v rámci Bratislavy pri objednávke nad 60 €. Pri väčších
            zákazkách a pravidelnom servise pre firmy pripravíme individuálnu ponuku.
          </p>
        </div>
      </section>

      {/* ---------------- OBLASTI ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Kde pôsobíme"
            title="Bratislava"
            highlight="a okolie"
            lead="Bežne vychádzame do 30 km od Bratislavy. Ak ste ďalej, ozvite sa — pri väčších zákazkách prídeme aj tak."
          />
          <AreaList />
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Časté" highlight="otázky" />
          <FaqList />
        </div>
      </section>

      {/* ---------------- KONTAKT ---------------- */}
      <section className="section" id="kontakt">
        <div className="wrap contact-layout">
          <div>
            <span className="eyebrow">Kontakt</span>
            <h2 className="h2">
              Bezplatná <span>kalkulácia</span>
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Napíšte nám, čo potrebujete vyčistiť — ideálne s fotkou. Cenovú ponuku pošleme
              zvyčajne do niekoľkých hodín.
            </p>
            <div className="contact-list">
              <a className="contact-row" href={`tel:${site.phoneHref}`}>
                <span className="icon-badge">
                  <Icon name="phone" />
                </span>
                <span>
                  <small>Telefón</small>
                  <strong>{site.phone}</strong>
                </span>
              </a>
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
          </div>
          <ContactForm />
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(64px, 7vw, 108px)" }}>
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
