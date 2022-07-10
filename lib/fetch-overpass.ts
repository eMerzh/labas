export type ResultTags = Record<string, string>;

export interface ResultItem {
  osm_id: number;
  type: string;
  lat: string;
  lon: string;
  timestamp: string;
  user: {
    name: string;
    id: number;
  };
  tags: ResultTags;
}

const fetchOpts: RequestInit = {
  redirect: "follow",
  headers: {
    accept: "application/json",
    "user-agent": "https://github.com/eMerzh/labas",
  },
};

const fetchPlus = async (url, options = {}, retries = 3) => {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0) {
        return fetchPlus(url, options, retries - 1);
      }
      throw new Error(res.statusText);
    })
    .catch((error) => console.error(error.message));
};

export async function query(query: string): Promise<[ResultItem]> {
  // Call an external API endpoint to get posts
  const wrappedQuery = `
    [out:json][timeout:25];
    (
        area[name="Braine-l'Alleud"]->.b;
        ${query}
    );
    out meta center;`;

  const url =
    "https://overpass-api.de/api/interpreter?" +
    new URLSearchParams({ data: wrappedQuery }).toString();
  console.log("Fetching ", query);
  const res = await fetchPlus(url, fetchOpts);
  const data = await res.json();

  return data.elements.filter((e) => e.type != "area").map(processResult);
}

function processResult(el): ResultItem {
  const item = {
    osm_id: el.id,
    type: el.type,
    lat: el.center?.lat || el.lat,
    lon: el.center?.lon || el.lon,
    tags: el.tags,
    timestamp: el.timestamp,
    user: {
      name: el.user,
      id: el.uid,
    },
  };

  return item;
}
