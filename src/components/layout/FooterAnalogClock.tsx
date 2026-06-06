"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-media-query";

interface FooterAnalogClockProps {
  city: string;
  timezone: string;
}

interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
}

function readClockTime(date: Date, timezone: string): ClockTime {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const hours = pick("hour");
  const minutes = pick("minute");
  const seconds = pick("second");

  const label = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return { hours, minutes, seconds, label };
}

function handRotation(
  hours: number,
  minutes: number,
  seconds: number,
): { hour: number; minute: number; second: number } {
  return {
    second: (seconds / 60) * 360,
    minute: (minutes / 60) * 360 + (seconds / 60) * 6,
    hour: ((hours % 12) / 12) * 360 + (minutes / 60) * 30,
  };
}

export function FooterAnalogClock({ city, timezone }: FooterAnalogClockProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [time, setTime] = useState<ClockTime>(() =>
    readClockTime(new Date(), timezone),
  );

  useEffect(() => {
    const tick = () => setTime(readClockTime(new Date(), timezone));
    tick();

    const intervalMs = reduceMotion ? 60_000 : 1_000;
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [timezone, reduceMotion]);

  const rotation = handRotation(time.hours, time.minutes, time.seconds);
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * 360;
    return (
      <line
        key={angle}
        x1="50"
        y1="8"
        x2="50"
        y2="11.5"
        transform={`rotate(${angle} 50 50)`}
        className="footer-clock__tick"
      />
    );
  });

  return (
    <div className="footer-clock" aria-label={`${city}, ${time.label}`}>
      <svg
        className="footer-clock__face"
        viewBox="0 0 100 100"
        aria-hidden
        focusable="false"
      >
        <circle cx="50" cy="50" r="46" className="footer-clock__ring" />
        {ticks}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          className="footer-clock__hand footer-clock__hand--hour"
          transform={`rotate(${rotation.hour} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="22"
          className="footer-clock__hand footer-clock__hand--minute"
          transform={`rotate(${rotation.minute} 50 50)`}
        />
        {!reduceMotion ? (
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            className="footer-clock__hand footer-clock__hand--second"
            transform={`rotate(${rotation.second} 50 50)`}
          />
        ) : null}
        <circle cx="50" cy="50" r="2.2" className="footer-clock__hub" />
      </svg>
    </div>
  );
}
