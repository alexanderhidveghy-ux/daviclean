"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Menu, Phone, Send, X } from "lucide-react";
import { services, site } from "@/lib/site";
import { Icon, Logo } from "@/components/ui";
import { OrderButton, OrderDrawerProvider } from "@/components/order-drawer";
import {
  CookieConsentProvider,
  CookieSettingsButton,
} from "@/components/cookie-consent";

const nav = [
  { href: "/sluzby", label: "Služby" },
  { href: "/cennik", label: "Cenník" },
  { href: "/cenova-ponuka", label: "Cenová ponuka" },
  { href: "/o-nas", label: "O nás" },
  { href: "/referencie", label: "Referencie" },
  { href: "/kontakt", label: "Kontakt" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="top-strip">
        {site.phone && (
          <a href={`tel:${site.phoneHref}`}>
            <Phone /> {site.phone}
          </a>
        )}
        <a href={`mailto:${site.email}`}>
          <Mail /> {site.email}
        </a>
        <span className="hide-sm">
          <Clock /> {site.hours}
        </span>
      </div>

      <div className="wrap nav-shell">
        <Link href="/" aria-label="Daviclean — domovská stránka">
          <Logo />
        </Link>

        <nav className="desktop-nav">
          <div className="has-drop">
            <Link href="/sluzby">Služby</Link>
            <div className="drop-panel">
              {services.map((s) => (
                <Link key={s.slug} href={`/sluzby/${s.slug}`}>
                  <Icon name={s.icon} />
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          {nav.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          {site.phone ? (
            <a className="nav-phone" href={`tel:${site.phoneHref}`}>
              <Phone /> {site.phone}
            </a>
          ) : (
            <a className="nav-phone" href={`mailto:${site.email}`}>
              <Mail /> {site.email}
            </a>
          )}
          <OrderButton className="btn btn-primary btn-sm">Objednať</OrderButton>
        </nav>

        <button
          className="menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="wrap">
          {/* onClick na odkazoch: pathname sa nezmení pri kliku na aktuálnu stránku,
              takže samotný useEffect vyššie by menu nezavrel */}
          <nav className="mobile-nav" onClick={() => setOpen(false)}>
            <div className="mobile-nav-cta">
              <OrderButton className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                Objednať čistenie
              </OrderButton>
              {site.phone ? (
                <a className="btn btn-ghost btn-block" href={`tel:${site.phoneHref}`}>
                  <Phone size={16} /> {site.phone}
                </a>
              ) : (
                <a className="btn btn-ghost btn-block" href={`mailto:${site.email}`}>
                  <Mail size={16} /> {site.email}
                </a>
              )}
            </div>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            {services.map((s) => (
              <Link key={s.slug} href={`/sluzby/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ marginTop: 18 }}>
              Profesionálne hĺbkové čistenie pre domácnosti, autá, firmy aj exteriér. Pôsobíme
              v Bratislave a okolí, pracujeme s vlastnou technikou a ekologickou chémiou.
            </p>
          </div>

          <div>
            <h4>Služby</h4>
            <div className="footer-links">
              {services.slice(0, 6).map((s) => (
                <Link key={s.slug} href={`/sluzby/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>Web</h4>
            <div className="footer-links">
              <Link href="/sluzby">Všetky služby</Link>
              <Link href="/cennik">Cenník</Link>
              <Link href="/cenova-ponuka">Cenová ponuka z fotky</Link>
              <Link href="/o-nas">O nás</Link>
              <Link href="/referencie">Referencie</Link>
              <Link href="/faq">Časté otázky</Link>
              <Link href="/kontakt">Kontakt</Link>
            </div>
          </div>

          <div>
            <h4>Kontakt</h4>
            <div className="footer-contact">
              {site.phone && (
                <a href={`tel:${site.phoneHref}`}>
                  <Phone /> {site.phone}
                </a>
              )}
              <a href={`mailto:${site.email}`}>
                <Mail /> {site.email}
              </a>
              <span>
                <MapPin /> {site.region}
              </span>
              <span>
                <Clock /> {site.hours}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName} — všetky práva vyhradené.
          </span>
          <nav>
            <Link href="/ochrana-osobnych-udajov">Ochrana osobných údajov</Link>
            <CookieSettingsButton />
            <Link href="/kontakt">Napíšte nám</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({
  children,
  drawerImage,
}: {
  children: React.ReactNode;
  drawerImage: string;
}) {
  const pathname = usePathname();
  return (
    <CookieConsentProvider>
      <OrderDrawerProvider image={drawerImage}>
      <Header />
      {/* key vynúti remount pri zmene routy → prehrá sa nábehová animácia */}
      <main key={pathname} className="route-fade">
        {children}
      </main>
      <Footer />
      {site.phone ? (
        <a className="float-call" href={`tel:${site.phoneHref}`} aria-label="Zavolať">
          <Phone />
        </a>
      ) : (
        <OrderButton className="float-call">
          <Send />
        </OrderButton>
      )}
      </OrderDrawerProvider>
    </CookieConsentProvider>
  );
}
