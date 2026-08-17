import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "@/components/cookie-consent";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description:
    "Informácie o spracúvaní osobných údajov pri odosielaní dopytu cez web Daviclean v zmysle GDPR.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Domov</Link> / <span>Ochrana osobných údajov</span>
          </div>
          <h1>Ochrana osobných údajov</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap detail-body" style={{ maxWidth: 860 }}>
          <h2>Prevádzkovateľ</h2>
          <p>
            {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city}, IČO:{" "}
            {site.ico}. Kontakt: {site.email}
            {site.phone ? `, ${site.phone}` : ""}.
          </p>

          <h2>Aké údaje spracúvame</h2>
          <p>
            Pri odoslaní kontaktného formulára spracúvame meno, telefónne číslo, e-mail, miesto
            realizácie a text vašej správy. Údaje používame výhradne na vybavenie dopytu,
            prípravu cenovej ponuky a dohodnutie termínu.
          </p>

          <h2>Právny základ a doba uchovávania</h2>
          <p>
            Právnym základom je váš súhlas, resp. vykonanie opatrení pred uzatvorením zmluvy.
            Údaje uchovávame najviac 24 mesiacov od poslednej komunikácie, pri realizovaných
            zákazkách po dobu vyplývajúcu z účtovných predpisov.
          </p>

          <h2>Komu údaje poskytujeme</h2>
          <p>
            Údaje neposkytujeme tretím stranám na marketingové účely a nepredávame ich. Prístup
            k nim môžu mať poskytovatelia technických služieb (hosting, e-mailová služba) v rozsahu
            nevyhnutnom na prevádzku webu.
          </p>

          <h2>Vaše práva</h2>
          <p>
            Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania,
            prenosnosť a právo kedykoľvek odvolať súhlas — napíšte nám na {site.email}. Rovnako
            máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR.
          </p>

          <h2>Cookies</h2>
          <p style={{ marginBottom: 20 }}>
            Svoje nastavenie cookies môžete kedykoľvek zmeniť — stačí otvoriť panel nižšie
            a prepínače uložiť. Zmena platí okamžite.
          </p>
          <CookieSettingsButton className="btn btn-ghost">
            Zmeniť nastavenia cookies
          </CookieSettingsButton>
          <p style={{ marginTop: 24 }}>
            Web používa iba nevyhnutné technické cookies potrebné na jeho správne fungovanie
            a uloženie vášho súhlasu. Nepoužívame reklamné ani profilovacie cookies.
          </p>

          <p style={{ color: "var(--muted-2)", fontSize: 13, marginTop: 40 }}>
            Tento dokument je vzorový. Pred spustením webu ho nechajte skontrolovať a doplňte
            skutočné identifikačné údaje spoločnosti.
          </p>
        </div>
      </section>
    </>
  );
}
