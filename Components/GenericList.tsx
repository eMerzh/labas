import opening_hours from "opening_hours";
import { Fragment } from "react";
import { ResultItem } from "../lib/fetch-overpass";

function getHostname(url: string): string {
  let domain = new URL(url);
  return domain.hostname;
}

export function getWebsiteCell(item: ResultItem) {
  const website = item.tags["website"];
  if (!website) return null;
  return (
    <a href={website} target="_blank" rel="noopener noreferrer">
      {getHostname(website)}
    </a>
  );
}

export function getEditCell(item: ResultItem) {
  return (
    <Fragment>
      <a
        href={`https://www.openstreetmap.org/${item.type}/${item.osm_id}`}
        target="_blank"
        rel="noreferrer"
      >
        🗺
      </a>
      <a
        href={`https://www.openstreetmap.org/edit?${item.type}=${item.osm_id}`}
        target="_blank"
        rel="noreferrer"
      >
        ✍️
      </a>
    </Fragment>
  );
}
export function getStreetCell(item: ResultItem) {
  return `${item.tags["addr:street"] || ""} ${
    item.tags["addr:housenumber"] || ""
  }`;
}
export function getCityCell(item: ResultItem) {
  return item.tags["addr:postcode"];
}

export function getOpeningCell(item: ResultItem) {
  if (!item.tags["opening_hours"]) return null;
  try {
    const parsed = new opening_hours(item.tags["opening_hours"], {
      lat: parseInt(item.lat, 10),
      lon: parseInt(item.lon, 10),
      address: { country_code: "be", state: "" },
    });
    return parsed.getStateString();
  } catch (e) {
    console.warn(e);
    return null;
  }
}

type GenericProps = {
  items: [ResultItem];
  withOpening?: boolean;
};

function GenericList({ items, withOpening = false }: GenericProps) {
  return (
    <table className="table-fill">
      <thead>
        <tr>
          <th></th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>CP</th>
          <th>Web</th>
          {withOpening ? <th>Ouvert ?</th> : null}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.osm_id}>
              <td>{getEditCell(item)}</td>
              <td>{item.tags?.name}</td>
              <td>{getStreetCell(item)}</td>
              <td>{getCityCell(item)}</td>
              <td>{getWebsiteCell(item)}</td>
              {withOpening ? <td>{getOpeningCell(item)}</td> : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default GenericList;
