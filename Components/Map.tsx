import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { ResultItem } from "../lib/fetch-overpass";

interface MapProps {
  items: ResultItem[];
  initialLat: number;
  initialLon: number;
  outerBox: [number, number, number, number];
}
const Map = ({ items, initialLat, initialLon, outerBox }: MapProps) => {
  const mapContainer = useRef(null);
  const mapRef = useRef<maplibregl.Map>();
  const [lng] = useState<number>(initialLon);
  const [lat] = useState<number>(initialLat);
  const [zoom] = useState(13);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) {
      return; //stops map from intializing more than once
    }
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/bright/style.json?key=UVAKtN0Z84SNZiFO1wFP`,
      center: [lng, lat],
      zoom: zoom,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({}), "top-right");
    // restict to bounding box
    map.setMaxBounds(outerBox);
    items.map((item) => {
      // create the popup
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<h2>${item.tags.name}</h2>`,
      );

      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([parseFloat(item.lon), parseFloat(item.lat)])
        .setPopup(popup)
        .addTo(map);
    });
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
