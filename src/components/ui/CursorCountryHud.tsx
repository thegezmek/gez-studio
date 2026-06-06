import { CountryGeoIcon } from "@/components/ui/CountryGeoIcon";
import type { CountryGeoKey } from "@/data/country-geo";

interface CursorCountryHudProps {
  country: string;
  countryKeys: CountryGeoKey[];
  tint?: string;
}

export function CursorCountryHud({
  country,
  countryKeys,
  tint = "180, 176, 168",
}: CursorCountryHudProps) {
  return (
    <span
      className="cursor-country-hud"
      style={{ "--cursor-tint": tint } as React.CSSProperties}
    >
      <span className="cursor-country-hud__geo">
        {countryKeys.map((geoKey) => (
          <CountryGeoIcon
            key={geoKey}
            geoKey={geoKey}
            className="cursor-country-hud__icon"
          />
        ))}
      </span>
      <span className="cursor-country-hud__label">{country}</span>
    </span>
  );
}
