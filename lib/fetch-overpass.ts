export type ResultTags = Record<string, string>;

export interface ResultItem {
  osm_id: number;
  type: string;
  lat: string;
  lon: string;
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
    out meta tags center;`;

  const url =
    "https://overpass-api.de/api/interpreter?" +
    new URLSearchParams({ data: wrappedQuery }).toString();
  console.log("URL", url);
  const res = await fetchPlus(url, fetchOpts);
  // console.log(res, await res.text)
  const data = await res.json();
  // console.log("query", data)

  return data.elements.filter((e) => e.type != "area").map(processResult);
}

function processResult(el): ResultItem {
  const item = {
    osm_id: el.id,
    type: el.type,
    lat: el.center?.lat || el.lat,
    lon: el.center?.lon || el.lon,
    tags: el.tags,
  };
  // console.log('item', item)
  return item;
}
