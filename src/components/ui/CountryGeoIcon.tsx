import type { CountryGeoKey } from "@/data/country-geo";
import { COUNTRY_GEO_SHAPES } from "@/data/country-geo-shapes";

interface CountryGeoIconProps {
  geoKey: CountryGeoKey;
  className?: string;
}

export function CountryGeoIcon({ geoKey, className }: CountryGeoIconProps) {
  const shape = COUNTRY_GEO_SHAPES[geoKey];
  const content = (
    <>
      {shape.paths?.map((path, index) => (
        <path
          key={index}
          d={path}
          fill="currentColor"
          stroke="none"
        />
      ))}
      {shape.path ? (
        <path
          d={shape.path}
          fill="currentColor"
          fillRule="nonzero"
          stroke="none"
        />
      ) : null}
    </>
  );

  return (
    <svg
      className={className}
      viewBox={shape.viewBox}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {shape.transform ? <g transform={shape.transform}>{content}</g> : content}
    </svg>
  );
}
