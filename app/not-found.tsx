import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ paddingBottom: 120 }}>
      <div className="wrap">
        <h1>
          404 — <span style={{ color: "var(--blue)" }}>stránka sa nenašla</span>
        </h1>
        <p className="lead">
          Táto stránka neexistuje alebo bola presunutá. Skúste prehľad služieb alebo nám rovno
          napíšte.
        </p>
        <div className="hero-actions" style={{ marginTop: 26 }}>
          <Link className="btn btn-primary" href="/">
            Na úvod <ArrowRight size={16} />
          </Link>
          <Link className="btn btn-ghost" href="/sluzby">
            Naše služby
          </Link>
        </div>
      </div>
    </section>
  );
}
