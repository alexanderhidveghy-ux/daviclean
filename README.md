# Daviclean — web

Prezentačný web pre profesionálne čistenie **Daviclean** (Bratislava a okolie).
Dizajn vychádza z brand vizuálu (tmavá téma + modrý akcent), štruktúra a obsah zo
štandardu podobných služieb (jovitep.sk): služby → cenník → referencie → FAQ → dopyt.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 (PostCSS) · lucide-react

## Dizajnový systém

Všetko je v `app/globals.css` cez CSS premenné — farby aj typografia sa menia na jednom mieste.

**Typografia** (načítaná cez `next/font/google`, subset `latin-ext` kvôli diakritike):

| premenná | font | použitie |
|---|---|---|
| `--heading` | Bricolage Grotesque | veľké nadpisy, logo, názvy kariet |
| `--body` | Inter Tight | bežný text |
| `--mono` | JetBrains Mono | štítky, tlačidlá, ceny, čísla, drobčeková navigácia |

Pravidlo: **VERZÁLKY len na mikro-popisky** (eyebrow, tlačidlá, štítky). Veľké nadpisy sú
v normálnom písaní, ale výrazne väčšie a s tesným prestrkom (`-4,5 %`).
Čísla a ceny majú `font-variant-numeric: tabular-nums`, takže sa v stĺpci zarovnávajú.

**Povrchy:** karty majú gradientový 1px okraj (`--card-edge`, po nabehnutí `--card-edge-hot`),
vnútorné svetlo (`--inner-light`) a cez celú stránku ide jemné zrno (`body::after`).

**Pohyb:** nábeh sekcií pri scrollovaní (`components/reveal.tsx`), prechod pri zmene stránky
(`.route-fade`), bežiaci pás (`Marquee`) a parallax fotiek cez CSS scroll-driven animácie —
tie sú v `@supports (animation-timeline: view())`, takže v starších prehliadačoch sa
jednoducho nespustia. Všetko rešpektuje `prefers-reduced-motion`.

## Spustenie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkčný build
npm run start
```

## Štruktúra

```
app/
  page.tsx                     domovská stránka (hero, služby, výhody, postup, cenník, FAQ, dopyt)
  sluzby/page.tsx              prehľad služieb po kategóriách
  sluzby/[slug]/page.tsx       detail služby (9 staticky generovaných stránok)
  cennik/ o-nas/ referencie/ kontakt/ faq/
  ochrana-osobnych-udajov/     vzorové GDPR znenie — pred spustením dať skontrolovať
  api/dopyt/route.ts           príjem kontaktného formulára
  sitemap.ts robots.ts         SEO
components/
  site-chrome.tsx              hlavička, pätička, cookie lišta, plávajúce volanie
  ui.tsx sections.tsx          ikony, nadpisy, CTA, FAQ, cenník, recenzie
  contact-form.tsx reveal.tsx  formulár, animácia pri scrollovaní
lib/site.ts                    VŠETOK obsah a kontakty na jednom mieste
```

## Čo treba doplniť pred spustením

1. **Kontakty a firemné údaje** — `lib/site.ts` (`site`): telefón, e-mail, adresa,
   IČO/DIČ. Momentálne sú tam údaje z vizuálu (+421 910 123 456), teda placeholdery.
2. **Ceny** — `lib/site.ts` (`pricing`, `services[].priceFrom`). Sú nastavené na
   bežnú trhovú úroveň v Bratislave, ale treba ich potvrdiť.
3. **Fotky** — pozri sekciu *Fotky* nižšie (teraz sú tam dočasné SVG placeholdery).
4. **Recenzie** — `lib/site.ts` (`testimonials`) sú ilustračné. Nahradiť skutočnými
   (ideálne prepis z Google profilu), inak ich zo stránky odstrániť.
5. **Doména** — `site.url` v `lib/site.ts` (ovplyvňuje canonical, sitemap, OG).

## Objednávkový panel (drawer)

Tlačidlá „Objednať" (hlavička, mobilné menu, hero, CTA pásy) otvárajú bočný panel
z [`components/order-drawer.tsx`](components/order-drawer.tsx) — fotka, kontakty,
kalkulačka a formulár na jednom mieste, bez opustenia stránky.

- Otvorí sa aj priamym odkazom `…/#objednat` (použiteľné v e-maile alebo reklame).
- Zatvára sa krížikom, klikom mimo panela alebo klávesom `Esc`; počas otvorenia je
  zamknuté scrollovanie stránky.
- Kdekoľvek v kóde stačí použiť `<OrderButton>Text</OrderButton>`.

**Kalkulačka** počíta zo sadzieb v `lib/site.ts` → `calculator` (+ `MIN_ORDER`,
`DELIVERY_FEE`, `FREE_DELIVERY_FROM`). Ceny sú tam číselne, aby sa dali sčítať —
**pri zmene cenníka upravte aj `pricing`**, sú to dva samostatné zoznamy.
Výsledok sa odosiela spolu s dopytom ako `kalkulacia`, takže v e-maile vidíte,
čo si zákazník naklikal.

## Fotky

Web očakáva 10 fotiek — hero + jednu ku každej službe (používajú sa v kartách služieb,
na detailoch aj v galérii na `/referencie`).

`lib/images.ts` vždy uprednostní reálnu fotku pred placeholderom, takže **stačí súbor
nakopírovať do `public/images/` a nič sa nemusí prepisovať v kóde**:

```
public/images/hero.jpg                              (4:5, na výšku)
public/images/sluzby/tepovanie-gaucov-a-sedaciek.jpg  (16:10)
public/images/sluzby/tepovanie-matracov.jpg
public/images/sluzby/cistenie-kobercov.jpg
public/images/sluzby/cistenie-aut-interier.jpg
public/images/sluzby/odstranovanie-graffiti.jpg
public/images/sluzby/tlakove-cistenie-dlazby-a-fasad.jpg
public/images/sluzby/ozonovanie-odstranenie-zapachu.jpg
public/images/sluzby/hlbkove-cistenie-kancelarii.jpg
public/images/sluzby/porealizacne-stavebne-cistenie.jpg
```

Podporované prípony: `.avif`, `.webp`, `.jpg`, `.png`.

### Generovanie AI fotiek

Zadania (prompty) ku všetkým desiatim záberom sú v [`scripts/prompts.mjs`](scripts/prompts.mjs)
— dajú sa vložiť do Midjourney, ChatGPT, Gemini alebo Fluxu. Alebo automaticky:

```bash
export OPENAI_API_KEY=sk-...        # gpt-image-1
# alebo
export REPLICATE_API_TOKEN=r8_...   # FLUX 1.1 pro

node scripts/generate-images.mjs                    # všetky
node scripts/generate-images.mjs hero               # len vybrané
```

Placeholdery sa dajú kedykoľvek pregenerovať cez `node scripts/generate-placeholders.mjs`.

> **Pozor pri AI fotkách:** nepoužívajte zábery, na ktorých je rozpoznateľná tvár
> alebo cudzie logo, a na `/referencie` ich neprezentujte ako skutočné realizácie —
> je to zavádzajúce voči zákazníkom. Ideálne ich čo najskôr nahradiť reálnymi fotkami z práce.

## Odosielanie formulára

`app/api/dopyt/route.ts` validuje dopyt, má honeypot proti robotom a:

- **bez `RESEND_API_KEY`** → dopyt zapíše do logu servera (vývoj),
- **s `RESEND_API_KEY`** → odošle e-mail cez [Resend](https://resend.com).

```bash
# .env.local
RESEND_API_KEY=re_xxx
CONTACT_TO=info@daviclean.sk
CONTACT_FROM="Web Daviclean <web@daviclean.sk>"
```

Doména odosielateľa musí byť v Resende overená. Alternatívne sa dá route prepísať
na SMTP (nodemailer) alebo na formspree/webhook — logika validácie zostáva rovnaká.

## SEO

- metadata + OpenGraph pre každú stránku, canonical URL
- JSON-LD `LocalBusiness` (layout) a `FAQPage` (`/faq`)
- `sitemap.xml` a `robots.txt` sa generujú automaticky
- pri rozšírení do ďalších miest stačí pridať mestá do `areas` a založiť
  stránky typu `/sluzby/tepovanie-sedaciek-senec` podľa vzoru detailu služby
