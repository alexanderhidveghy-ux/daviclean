"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "daviclean-cookie-consent";

export type Consent = {
  /** vždy zapnuté — bez nich web nefunguje */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO dátum udelenia súhlasu — pri GDPR treba vedieť preukázať kedy */
  date: string;
};

const CATEGORIES = [
  {
    key: "necessary" as const,
    title: "Nevyhnutné",
    required: true,
    text: "Potrebné na základné fungovanie webu — zapamätanie si vášho súhlasu a bezpečné odoslanie formulára. Bez nich by web nefungoval, preto sa nedajú vypnúť.",
  },
  {
    key: "analytics" as const,
    title: "Analytické",
    required: false,
    text: "Anonymne merajú návštevnosť a to, ktoré stránky vás zaujímajú. Pomáhajú nám web zlepšovať. Neidentifikujú vás ako osobu.",
  },
  {
    key: "marketing" as const,
    title: "Marketingové",
    required: false,
    text: "Umožňujú zobraziť vám našu reklamu na iných weboch a merať jej úspešnosť. Bez súhlasu žiadnu reklamu nesledujeme.",
  },
];

type ConsentContext = {
  consent: Consent | null;
  /** otvorí podrobné nastavenie — odkaz v pätičke aj stránka o ochrane údajov */
  openSettings: () => void;
};

const Ctx = createContext<ConsentContext | null>(null);

export function useCookieConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCookieConsent musí byť vnútri <CookieConsentProvider>");
  return ctx;
}

/** Odkaz / tlačidlo, ktoré otvorí podrobné nastavenie cookies. */
export function CookieSettingsButton({
  children = "Nastavenia cookies",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openSettings } = useCookieConsent();
  return (
    <button type="button" className={className ?? "linklike"} onClick={openSettings}>
      {children}
    </button>
  );
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

const stamp = (analytics: boolean, marketing: boolean): Consent => ({
  necessary: true,
  analytics,
  marketing,
  date: new Date().toISOString(),
});

/**
 * Prvotný banner pri príchode na web — zámerne bez prepínačov.
 * Neblokuje stránku, len sa drží pri spodnej hrane.
 */
function Banner({
  onSave,
  onOpenSettings,
}: {
  onSave: (consent: Consent) => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="cc-banner" role="region" aria-label="Súhlas s cookies">
      <span className="icon-badge">
        <Cookie size={22} strokeWidth={1.8} />
      </span>
      <div className="cc-banner-text">
        <strong>Používame cookies</strong>
        <p>
          Nevyhnutné potrebujeme na chod webu, analytické a marketingové len s vaším súhlasom.
          Viac v sekcii <Link href="/ochrana-osobnych-udajov">Ochrana osobných údajov</Link>.
        </p>
      </div>
      <div className="cc-banner-actions">
        <button className="btn btn-primary btn-sm" onClick={() => onSave(stamp(true, true))}>
          Prijať všetko
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => onSave(stamp(false, false))}>
          Odmietnuť voliteľné
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onOpenSettings}>
          Nastavenia
        </button>
      </div>
    </div>
  );
}

/** Podrobné nastavenie s prepínačmi — otvára sa až na vyžiadanie. */
function Settings({
  initial,
  onSave,
  onClose,
}: {
  initial: Consent | null;
  onSave: (consent: Consent) => void;
  onClose: () => void;
}) {
  const [analytics, setAnalytics] = useState(initial?.analytics ?? false);
  const [marketing, setMarketing] = useState(initial?.marketing ?? false);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [requestClose]);

  /* poistka, keby animácia nedobehla — panel nesmie zostať visieť */
  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(onClose, 400);
    return () => clearTimeout(timer);
  }, [closing, onClose]);

  const values: Record<string, boolean> = { necessary: true, analytics, marketing };
  const setters: Record<string, (v: boolean) => void> = {
    analytics: setAnalytics,
    marketing: setMarketing,
  };

  return (
    <div
      className={`cc-backdrop${closing ? " is-closing" : ""}`}
      onClick={requestClose}
      onAnimationEnd={(e) => {
        if (closing && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-title"
        className={`cc-dialog${closing ? " is-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cc-head">
          <span className="icon-badge">
            <Cookie size={22} strokeWidth={1.8} />
          </span>
          <div>
            <h2 id="cc-title">Nastavenie cookies</h2>
            <p>
              Vyberte, ktoré kategórie môžeme použiť. Súhlas viete kedykoľvek zmeniť odkazom
              v pätičke webu.
            </p>
          </div>
          <button className="cc-close" onClick={requestClose} aria-label="Zavrieť">
            <X size={18} />
          </button>
        </div>

        <div className="cc-list">
          {CATEGORIES.map((cat) => (
            <label className={`cc-item${cat.required ? " is-locked" : ""}`} key={cat.key}>
              <span className="cc-item-text">
                <strong>{cat.title}</strong>
                <span>{cat.text}</span>
              </span>
              <span className="cc-switch">
                <input
                  type="checkbox"
                  checked={values[cat.key]}
                  disabled={cat.required}
                  onChange={(e) => setters[cat.key]?.(e.target.checked)}
                  aria-label={cat.title}
                />
                <span className="cc-track" aria-hidden="true" />
                <span className="cc-state">
                  {cat.required ? "Vždy zapnuté" : values[cat.key] ? "Zapnuté" : "Vypnuté"}
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="cc-actions">
          <button className="btn btn-primary" onClick={() => onSave(stamp(analytics, marketing))}>
            Uložiť výber
          </button>
          <button className="btn btn-ghost" onClick={() => onSave(stamp(true, true))}>
            Prijať všetko
          </button>
          <button className="btn btn-ghost" onClick={() => onSave(stamp(false, false))}>
            Odmietnuť voliteľné
          </button>
        </div>

        <p className="cc-note">
          Podrobnosti nájdete v sekcii{" "}
          <Link href="/ochrana-osobnych-udajov">Ochrana osobných údajov</Link>.
        </p>
      </div>
    </div>
  );
}

type View = "banner" | "settings" | null;

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [view, setView] = useState<View>(null);

  useEffect(() => {
    const stored = read();
    setConsent(stored);
    if (!stored) setView("banner");
  }, []);

  const value = useMemo<ConsentContext>(
    () => ({ consent, openSettings: () => setView("settings") }),
    [consent],
  );

  const handleSave = (next: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* súkromný režim — súhlas platí aspoň pre túto reláciu */
    }
    setConsent(next);
    setView(null);
  };

  /* zavretie nastavení bez uloženia: kto sa ešte nerozhodol, dostane späť banner */
  const handleCloseSettings = useCallback(() => {
    setView(read() ? null : "banner");
  }, []);

  return (
    <Ctx.Provider value={value}>
      {children}
      {view === "banner" && (
        <Banner onSave={handleSave} onOpenSettings={() => setView("settings")} />
      )}
      {view === "settings" && (
        <Settings initial={consent} onSave={handleSave} onClose={handleCloseSettings} />
      )}
    </Ctx.Provider>
  );
}
