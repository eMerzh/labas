import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { ResultItem } from "../lib/fetch-overpass";

interface MapProps {
  items: ResultItem[];
  initialLat: number;
  initialLon: number;
}
const Map = ({ items, initialLat, initialLon }: MapProps) => {
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
    map.setMaxBounds([
      [4.3004211, 50.6259387], // [west, south]
      [4.4119959, 50.7342836], // [east, north]
    ]);
    items.map((item) => {
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([parseFloat(item.lon), parseFloat(item.lat)])
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
