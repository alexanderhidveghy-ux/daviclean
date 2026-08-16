"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { services } from "@/lib/site";

type State = "idle" | "sending" | "ok" | "err";

export function ContactForm({
  preselect,
  summary,
}: {
  preselect?: string;
  /** Zhrnutie z kalkulačky — pošle sa spolu s dopytom */
  summary?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      ...(summary ? { kalkulacia: summary } : {}),
    };
    setState("sending");
    try {
      const res = await fetch("/api/dopyt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Odoslanie zlyhalo");
      setState("ok");
      setMessage(json.message ?? "Ďakujeme, ozveme sa vám čo najskôr.");
      form.reset();
    } catch (err) {
      setState("err");
      setMessage(
        err instanceof Error ? err.message : "Formulár sa nepodarilo odoslať. Skúste to znova.",
      );
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="meno">Meno a priezvisko *</label>
          <input id="meno" name="meno" required placeholder="Ján Novák" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="telefon">Telefón *</label>
          <input
            id="telefon"
            name="telefon"
            required
            type="tel"
            placeholder="+421 900 000 000"
            autoComplete="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jan@email.sk"
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="sluzba">Služba</label>
          <select id="sluzba" name="sluzba" defaultValue={preselect ?? ""}>
            <option value="">Vyberte službu…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Iné / neviem zaradiť">Iné / neviem zaradiť</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="miesto">Miesto realizácie</label>
          <input id="miesto" name="miesto" placeholder="Bratislava — Ružinov" />
        </div>
        <div className="field full">
          <label htmlFor="sprava">Čo potrebujete vyčistiť? *</label>
          <textarea
            id="sprava"
            name="sprava"
            required
            placeholder="Napr. rohová sedačka a dva kusové koberce, škvrny od psa. Termín ideálne cez víkend."
          />
        </div>
      </div>

      {/* jednoduchá pasca na roboty */}
      <input type="text" name="web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />

      {summary && (
        <div className="form-summary">
          <strong>Z kalkulačky</strong>
          <pre>{summary}</pre>
        </div>
      )}

      <label className="form-consent">
        <input type="checkbox" name="suhlas" required />
        <span>
          Súhlasím so spracovaním osobných údajov na účel vybavenia dopytu. Údaje nepoužívame na
          marketing ani ich neposkytujeme tretím stranám.
        </span>
      </label>

      <button className="btn btn-primary btn-block" type="submit" disabled={state === "sending"} style={{ marginTop: 18 }}>
        <Send size={16} />
        {state === "sending" ? "Odosielam…" : "Odoslať dopyt"}
      </button>

      {(state === "ok" || state === "err") && (
        <p className={`form-status ${state === "ok" ? "ok" : "err"}`}>{message}</p>
      )}
    </form>
  );
}
