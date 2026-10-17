import type { ReactNode } from "react";

const MARKERS = ["Türkiye", "İlkay", "Bilgiç"] as const;

type MarkerWord = (typeof MARKERS)[number];

function DottedWord({
  visual,
  spoken,
}: {
  visual: ReactNode;
  spoken: string;
}) {
  return (
    <span className="dotted-turkiye">
      <span aria-hidden="true">{visual}</span>
      <span className="sr-only">{spoken}</span>
    </span>
  );
}

function DottedI() {
  return <span className="dotted-i">I</span>;
}

function Marker({ word }: { word: MarkerWord }) {
  if (word === "Türkiye") {
    return (
      <DottedWord
        spoken={"T\u00dcRK\u0130YE"}
        visual={
          <>
            T{"\u00DC"}RK
            <DottedI />
            YE
          </>
        }
      />
    );
  }

  if (word === "İlkay") {
    return (
      <DottedWord
        spoken={"\u0130LKAY"}
        visual={
          <>
            <DottedI />
            LKAY
          </>
        }
      />
    );
  }

  return (
    <DottedWord
      spoken={"B\u0130LG\u0130\u00C7"}
      visual={
        <>
          B
          <DottedI />
          LG
          <DottedI />
          {"\u00C7"}
        </>
      }
    />
  );
}

function isMarker(part: string): part is MarkerWord {
  return (MARKERS as readonly string[]).includes(part);
}

function turkishUpper(text: string): string {
  return [...text]
    .map((ch) => {
      if (ch === "i" || ch === "\u0130") return "\u0130";
      if (ch === "\u0131") return "I";
      return ch.toUpperCase();
    })
    .join("");
}

export function TurkishCaps({ text }: { text: string }) {
  return (
    <DottedWord
      spoken={turkishUpper(text)}
      visual={
        <>
          {[...text].map((ch, index) =>
            ch === "i" || ch === "\u0130" ? <DottedI key={index} /> : ch,
          )}
        </>
      }
    />
  );
}

export function DottedTurkiyeText({ text }: { text: string }): ReactNode {
  const parts = text.split(new RegExp(`(${MARKERS.join("|")})`, "g"));
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    isMarker(part) ? (
      <Marker key={`${part}-${index}`} word={part} />
    ) : (
      <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
    ),
  );
}
