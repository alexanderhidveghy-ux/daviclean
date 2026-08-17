"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { PhotoAnalyzer, type PhotoResult } from "@/components/photo-analyzer";

export function PhotoQuote() {
  const [photo, setPhoto] = useState<PhotoResult | null>(null);

  return (
    <div className="pq">
      <PhotoAnalyzer onResult={setPhoto} />

      <div className="pq-form">
        <h3>Poslať dopyt s týmto posúdením</h3>
        <p>
          Necháte nám kontakt a my sa ozveme s presnou cenou aj najbližším voľným termínom.
          {photo && " Posúdenie z fotky pripojíme automaticky."}
        </p>
        <ContactForm
          preselect={photo?.service || undefined}
          summary={photo?.summary}
          summaryLabel="Z posúdenia fotky"
        />
      </div>
    </div>
  );
}
