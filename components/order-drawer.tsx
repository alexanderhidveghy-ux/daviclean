"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clock, Mail, MapPin, Minus, Phone, Plus, X } from "lucide-react";
import {
  calculator,
  DELIVERY_FEE,
  FREE_DELIVERY_FROM,
  MIN_ORDER,
  site,
} from "@/lib/site";
import { ContactForm } from "@/components/contact-form";

type DrawerContext = { open: () => void; close: () => void };

const Ctx = createContext<DrawerContext | null>(null);

export function useOrderDrawer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrderDrawer musí byť vnútri <OrderDrawerProvider>");
  return ctx;
}

/** Tlačidlo, ktoré otvorí objednávkový panel. */
export function OrderButton({
  children,
  className = "btn btn-primary",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useOrderDrawer();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

function eur(value: number) {
  return `${value % 1 === 0 ? value : value.toFixed(2).replace(".", ",")} €`;
}

/** Kalkulačka orientačnej ceny — počíta zo sadzieb v lib/site.ts */
function Calculator({ onSummary }: { onSummary: (summary: string, total: number) => void }) {
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const { lines, subtotal } = useMemo(() => {
    const lines: { label: string; detail: string; price: number }[] = [];
    let subtotal = 0;
    for (const group of calculator) {
      for (const item of group.items) {
        const qty = amounts[item.id] ?? 0;
        if (qty <= 0) continue;
        const price = qty * item.price;
        subtotal += price;
        lines.push({
          label: item.label,
          detail: item.unit === "ks" ? `${qty}× ${eur(item.price)}` : `${qty} m² × ${eur(item.price)}`,
          price,
        });
      }
    }
    return { lines, subtotal };
  }, [amounts]);

  const delivery = subtotal > 0 && subtotal < FREE_DELIVERY_FROM ? DELIVERY_FEE : 0;
  const total = subtotal > 0 ? Math.max(subtotal, MIN_ORDER) + delivery : 0;

  useEffect(() => {
    if (!lines.length) {
      onSummary("", 0);
      return;
    }
    const summary = [
      ...lines.map((l) => `${l.label} (${l.detail}) = ${eur(l.price)}`),
      delivery ? `Doprava: ${eur(delivery)}` : "Doprava: zdarma",
      `Orientačne spolu: od ${eur(total)}`,
    ].join("\n");
    onSummary(summary, total);
  }, [lines, delivery, total, onSummary]);

  function setAmount(id: string, value: number) {
    setAmounts((prev) => ({ ...prev, [id]: Math.max(0, Math.min(999, value)) }));
  }

  return (
    <div className="calc">
      {calculator.map((group) => (
        <div key={group.group} className="calc-group">
          <h4>{group.group}</h4>
          {group.items.map((item) => {
            const qty = amounts[item.id] ?? 0;
            return (
              <div className={`calc-row${qty > 0 ? " is-active" : ""}`} key={item.id}>
                <span className="calc-label">
                  {item.label}
                  <em>
                    {eur(item.price)} / {item.unit === "ks" ? "ks" : "m²"}
                  </em>
                </span>
                <span className="calc-controls">
                  <button
                    type="button"
                    aria-label={`Ubrať — ${item.label}`}
                    onClick={() => setAmount(item.id, qty - (item.unit === "ks" ? 1 : (item.step ?? 5)))}
                    disabled={qty <= 0}
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    aria-label={`Množstvo — ${item.label} (${item.unit === "ks" ? "ks" : "m²"})`}
                    value={qty || ""}
                    placeholder="0"
                    onChange={(e) => setAmount(item.id, Number(e.target.value) || 0)}
                  />
                  <button
                    type="button"
                    aria-label={`Pridať — ${item.label}`}
                    onClick={() => setAmount(item.id, qty + (item.unit === "ks" ? 1 : (item.step ?? 5)))}
                  >
                    <Plus size={14} />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      ))}

      <div className={`calc-total${total > 0 ? " is-active" : ""}`}>
        {total > 0 ? (
          <>
            <div className="calc-total-row">
              <span>Práce</span>
              <b>{eur(Math.max(subtotal, MIN_ORDER))}</b>
            </div>
            <div className="calc-total-row">
              <span>Doprava (Bratislava)</span>
              <b>{delivery ? eur(delivery) : "zdarma"}</b>
            </div>
            <div className="calc-total-row calc-sum">
              <span>Orientačne od</span>
              <b>{eur(total)}</b>
            </div>
            {subtotal < MIN_ORDER && (
              <p className="calc-note">
                Minimálna objednávka je {eur(MIN_ORDER)} — menšie zákazky vieme spojiť s inou
                službou.
              </p>
            )}
            <p className="calc-note">
              Výpočet je orientačný. Presnú cenu potvrdíme podľa fotky alebo obhliadky, nižšie
              ju už máte predvyplnenú v dopyte.
            </p>
          </>
        ) : (
          <p className="calc-empty">
            Vyberte, čo potrebujete vyčistiť — cenu spočítame priebežne a prenesieme do dopytu.
          </p>
        )}
      </div>
    </div>
  );
}

function Drawer({ image, onClose }: { image: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [summary, setSummary] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const requestClose = useCallback(() => setClosing(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [requestClose]);

  const handleSummary = useCallback((value: string) => setSummary(value), []);

  return (
    <div
      className={`drawer-backdrop${closing ? " is-closing" : ""}`}
      onClick={requestClose}
      onAnimationEnd={() => {
        if (closing) onClose();
      }}
    >
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Objednať čistenie"
        className={`drawer${closing ? " is-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-photo">
          <img src={image} alt="" />
          <button className="drawer-close" onClick={requestClose} aria-label="Zavrieť panel">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <h2>Objednať čistenie</h2>
          <div className="drawer-rule" />
          <p className="drawer-lead">
            Povedzte nám, čo potrebujete vyčistiť. Cenu si viete hneď spočítať v kalkulačke
            nižšie a my ju po obhliadke alebo podľa fotky už len potvrdíme. Väčšinu zákaziek
            v Bratislave stíhame do 24 – 48 hodín.
          </p>

          <h3>Zavolajte nám</h3>
          <p className="drawer-hours">
            <Clock size={15} /> {site.hours}
          </p>
          <div className="drawer-contacts">
            <a href={`tel:${site.phoneHref}`}>
              <Phone size={16} /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={16} /> {site.email}
            </a>
            <span>
              <MapPin size={16} /> {site.region}
            </span>
          </div>

          <h3>Orientačná cena</h3>
          <Calculator onSummary={handleSummary} />

          <h3>Nezáväzný dopyt</h3>
          <ContactForm summary={summary} />
        </div>
      </aside>
    </div>
  );
}

export function OrderDrawerProvider({
  image,
  children,
}: {
  image: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  const value = useMemo<DrawerContext>(
    () => ({ open: () => setMounted(true), close: () => setMounted(false) }),
    [],
  );

  /* odkaz typu /cennik#objednat otvorí panel rovno — použiteľné v e-maile aj v reklame */
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#objednat") setMounted(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted && <Drawer image={image} onClose={() => setMounted(false)} />}
    </Ctx.Provider>
  );
}
