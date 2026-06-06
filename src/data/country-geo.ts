export type CountryGeoKey =
  | "turkiye"
  | "india"
  | "myanmar"
  | "thailand"
  | "africa"
  | "uganda"
  | "netherlands"
  | "kenya"
  | "rwanda"
  | "usa"
  | "amazon"
  | "globe";

const COUNTRY_ALIASES: Record<string, CountryGeoKey> = {
  türkiye: "turkiye",
  turkey: "turkiye",
  india: "india",
  myanmar: "myanmar",
  burma: "myanmar",
  thailand: "thailand",
  africa: "africa",
  uganda: "uganda",
  netherlands: "netherlands",
  holland: "netherlands",
  kenya: "kenya",
  rwanda: "rwanda",
  usa: "usa",
  "united states": "usa",
  "united states of america": "usa",
  amazon: "amazon",
};

export function countryKeysFromLabel(country?: string | null): CountryGeoKey[] {
  if (!country?.trim()) return [];

  const keys = country
    .split(",")
    .map((part) => COUNTRY_ALIASES[part.trim().toLowerCase()])
    .filter((key): key is CountryGeoKey => Boolean(key));

  return keys.length > 0 ? [...new Set(keys)] : ["globe"];
}
