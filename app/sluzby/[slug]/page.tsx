import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Mail } from "lucide-react";
import { services, site } from "@/lib/site";
import { photo } from "@/lib/images";
import { CtaBand, Icon } from "@/components/ui";
import { OrderButton } from "@/components/order-drawer";
import { ServiceGrid } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `${site.url}/sluzby/${service.slug}` },
    openGraph: { title: service.metaTitle, description: service.metaDescription },
  };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <Link href="/sluzby">Služby</Link> /{" "}
            <span>{service.title}</span>
          </div>
          <h1>{service.heading}</h1>
          <p className="lead">{service.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap detail-layout">
          <div className="detail-body">
            <Reveal>
              <figure className="detail-photo">
                <img src={photo(`sluzby/${service.slug}`)} alt={service.heading} />
              </figure>
              <p style={{ fontSize: 17, color: "#c6d2e0" }}>{service.intro}</p>
            </Reveal>

            <Reveal>
              <h2>Čo je v cene</h2>
              <ul className="check-list">
                {service.bullets.map((b) => (
                  <li key={b}>
                    <Check /> {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2>Ako postupujeme</h2>
              <ol className="ol-steps">
                {service.process.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2>Nezáväzná cenová ponuka</h2>
              <p>
                Napíšte nám rozsah práce, ideálne priložte fotku. Ozveme sa s presnou cenou
                a najbližším voľným termínom.
              </p>
              <ContactForm preselect={service.title} />
            </Reveal>
          </div>

          <aside className="aside-card">
            <span className="icon-badge">
              <Icon name={service.icon} />
            </span>
            <h3 style={{ marginTop: 16 }}>{service.title}</h3>
            <p>Cena závisí od rozsahu a stupňa znečistenia. Potvrdíme ju vždy dopredu.</p>
            <div className="aside-price">
              <strong>{service.priceFrom}</strong>
              <span>bez skrytých poplatkov</span>
            </div>
            <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
              <Clock size={16} color="#52a8ff" /> Trvanie: {service.duration}
            </p>
            <OrderButton className="btn btn-primary btn-block" service={service.title}>
              Poslať dopyt <ArrowRight size={15} />
            </OrderButton>
            <a className="btn btn-ghost btn-block" href={`mailto:${site.email}`} style={{ marginTop: 10 }}>
              <Mail size={16} /> {site.email}
            </a>
          </aside>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 28 }}>
            Ďalšie <span>služby</span>
          </h2>
          <ServiceGrid items={related} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <CtaBand />
        </div>
      </section>
    </>
  );
}
