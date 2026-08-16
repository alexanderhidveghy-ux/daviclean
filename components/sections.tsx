import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { areas, faq, pricing, testimonials, type Service } from "@/lib/site";
import { photo } from "@/lib/images";
import { Reveal } from "@/components/reveal";
import { Icon, Stars } from "@/components/ui";

/** Karta služby s fotkou — používa ju domovská stránka, prehľad aj detail. */
export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/sluzby/${service.slug}`} className="card service-card">
        <span className="service-photo">
          <img src={photo(`sluzby/${service.slug}`)} alt={service.title} loading="lazy" />
        </span>
        <span className="service-body">
          {/* ikona presahuje nad fotku — preto je mimo .service-photo, ktorá orezáva */}
          <span className="icon-badge">
            <Icon name={service.icon} />
          </span>
          <h3>{service.title}</h3>
          <p>{service.excerpt}</p>
          <span className="service-meta">
            <span className="service-price">{service.priceFrom}</span>
            <span className="service-more">
              Detail <ArrowRight size={14} />
            </span>
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function ServiceGrid({ items, bento = false }: { items: Service[]; bento?: boolean }) {
  return (
    <div className={`service-grid${bento ? " bento" : ""}`}>
      {items.map((service, i) => (
        <ServiceCard key={service.slug} service={service} delay={(i % 4) * 70} />
      ))}
    </div>
  );
}

/** Bežiaci pás s kľúčovými službami — čisto vizuálny, preto aria-hidden. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <span>
      {items.map((item) => (
        <span key={item} style={{ display: "contents" }}>
          <b>{item}</b>
          <i>◆</i>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

export function FaqList({ items = faq }: { items?: typeof faq }) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={i * 50}>
          <details className="faq-item">
            <summary>
              {item.q}
              <Plus />
            </summary>
            <div className="faq-body">
              <p>{item.a}</p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

export function PriceGrid({ groups = pricing }: { groups?: typeof pricing }) {
  return (
    <div className="price-grid">
      {groups.map((group, i) => (
        <Reveal key={group.title} delay={i * 60}>
          <div className="card price-card">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.label}>
                  <span>
                    {item.label}
                    {item.note && <em>{item.note}</em>}
                  </span>
                  <b>{item.price}</b>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ReviewList({ items = testimonials }: { items?: typeof testimonials }) {
  return (
    <div className="review-list">
      {items.map((review, i) => (
        <Reveal key={review.name} delay={i * 60}>
          <blockquote className="review">
            <Stars count={review.rating} />
            <p style={{ marginTop: 12 }}>„{review.text}“</p>
            <footer>
              <strong>{review.name}</strong>
              <span>{review.place}</span>
            </footer>
          </blockquote>
        </Reveal>
      ))}
    </div>
  );
}

export function AreaList() {
  return (
    <ul className="area-list">
      {areas.map((area) => (
        <li key={area}>{area}</li>
      ))}
    </ul>
  );
}
