"use client";

import { useId, useRef, useState } from "react";
import { Camera, Loader2, RefreshCw, Sparkles, Upload } from "lucide-react";

export type Analysis = {
  vhodne: boolean;
  predmet: string;
  sluzba: string;
  znecistenie: string;
  postreh: string;
  odhad: string;
  trvanie: string;
};

export type PhotoResult = { summary: string; service: string };

const MAX_SIDE = 1024;
const QUALITY = 0.82;

/**
 * Zmenší fotku priamo v prehliadači. Z mobilu chodia 4–12 MB súbory —
 * takto sa nahráva ~150 kB, je to rýchlejšie a lacnejšie na tokeny.
 */
function resize(file: File): Promise<{ base64: string; mime: string; preview: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Prehliadač nezvládol spracovať fotku."));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
      resolve({ base64: dataUrl.split(",")[1], mime: "image/jpeg", preview: dataUrl });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Súbor sa nepodarilo načítať ako obrázok."));
    };
    img.src = url;
  });
}

export function summarize(result: Analysis): string {
  return [
    `Predmet: ${result.predmet}`,
    result.sluzba && `Odporúčaná služba: ${result.sluzba}`,
    result.znecistenie && `Znečistenie: ${result.znecistenie}`,
    result.odhad && `Odhad z fotky: ${result.odhad}`,
    result.trvanie && `Predpokladané trvanie: ${result.trvanie}`,
    result.postreh && `Poznámka: ${result.postreh}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Nahranie fotky a jej posúdenie. Používa to stránka /cenova-ponuka
 * aj objednávkový panel (tam v kompaktnej podobe ako nepovinný krok).
 */
export function PhotoAnalyzer({
  onResult,
  compact = false,
}: {
  onResult?: (result: PhotoResult | null) => void;
  compact?: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setState("working");
    setError("");
    setResult(null);
    onResult?.(null);
    try {
      const { base64, mime, preview } = await resize(file);
      setPreview(preview);
      const res = await fetch("/api/analyza-fotky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mime }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Analýza zlyhala.");
      const analysis = json as Analysis;
      setResult(analysis);
      setState("done");
      onResult?.(analysis.vhodne ? { summary: summarize(analysis), service: analysis.sluzba } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Niečo sa pokazilo.");
      setState("error");
      onResult?.(null);
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setError("");
    setState("idle");
    onResult?.(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className={`pq-upload${compact ? " is-compact" : ""}`}>
      <input
        ref={fileRef}
        id={`file-${uid}`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => handleFile(e.target.files?.[0])}
        hidden
      />
      {/* capture spustí na mobile rovno fotoaparát */}
      <input
        id={`cam-${uid}`}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFile(e.target.files?.[0])}
        hidden
      />

      {preview ? (
        <figure className="pq-preview">
          <img src={preview} alt="Nahratá fotka" />
          {state === "working" && (
            <span className="pq-overlay">
              <Loader2 className="pq-spin" size={26} />
              Analyzujem fotku…
            </span>
          )}
        </figure>
      ) : (
        <div className="pq-drop">
          <span className="icon-badge">
            <Sparkles size={22} strokeWidth={1.8} />
          </span>
          <strong>
            {compact ? "Priložte fotku (nepovinné)" : "Nahrajte fotku toho, čo treba vyčistiť"}
          </strong>
          <p>
            {compact
              ? "Z fotky vieme rovno odhadnúť službu aj cenu — a vy nemusíte nič vypisovať."
              : "Sedačka, matrac, koberec, interiér auta, terasa alebo fasáda — stačí jeden záber."}
          </p>
        </div>
      )}

      <div className="pq-buttons">
        <label className="btn btn-primary btn-sm" htmlFor={`cam-${uid}`}>
          <Camera size={15} /> Odfotiť
        </label>
        <label className="btn btn-ghost btn-sm" htmlFor={`file-${uid}`}>
          <Upload size={15} /> Vybrať fotku
        </label>
        {preview && (
          <button className="btn btn-ghost btn-sm" type="button" onClick={reset}>
            <RefreshCw size={14} /> Znova
          </button>
        )}
      </div>

      {state === "error" && <p className="form-status err">{error}</p>}

      {state === "done" && result && !result.vhodne && (
        <p className="form-status err">
          Na fotke nevidím nič, čo by sme vedeli vyčistiť. Skúste iný záber alebo nám zákazku
          popíšte slovami.
        </p>
      )}

      {state === "done" && result?.vhodne && (
        <div className="pq-result">
          <span className="eyebrow">Posúdenie z fotky</span>
          <h3>{result.predmet}</h3>
          <div className="pq-facts">
            {result.sluzba && (
              <div>
                <small>Služba</small>
                <strong>{result.sluzba}</strong>
              </div>
            )}
            {result.znecistenie && (
              <div>
                <small>Znečistenie</small>
                <strong>{result.znecistenie}</strong>
              </div>
            )}
            {result.odhad && (
              <div>
                <small>Orientačná cena</small>
                <strong className="pq-price">{result.odhad}</strong>
              </div>
            )}
            {result.trvanie && (
              <div>
                <small>Trvanie</small>
                <strong>{result.trvanie}</strong>
              </div>
            )}
          </div>
          {result.postreh && <p className="pq-note">{result.postreh}</p>}
          <p className="pq-disclaimer">
            Ide o odhad z jednej fotky, nie o záväznú ponuku. Presnú cenu potvrdíme po obhliadke
            alebo po doplňujúcich otázkach — nikdy nie až po práci.
          </p>
        </div>
      )}

      {!compact && (
        <p className="pq-hint">
          Fotku zmenšíme priamo vo vašom zariadení, nahráva sa len malý náhľad. Neukladáme ju —
          slúži výhradne na posúdenie zákazky.
        </p>
      )}
    </div>
  );
}
