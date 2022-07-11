export interface CityItem {
  slug: string;
  name: string;
  center: { lat: number; lon: number };
  bbox: [number, number, number, number];
}

export const CURRENT_CITY: CityItem = {
  slug: "braine-lalleud",
  name: "Braine-l'Alleud",
  center: { lat: 50.683627, lon: 4.3749516 },
  bbox: [
    4.25, // [west, south]
    50.6,
    4.5, // [east, north]
    50.78,
  ],
};
