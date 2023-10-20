import { ResultItem } from "../lib/fetch-overpass";
import {
  getCityCell,
  getEditCell,
  getStreetCell,
  getWebsiteCell,
} from "./GenericList";

const ISCED_LEVELS = {
  elementary: "Maternelle",
  primary: "Primaire",
  secondary: "Secondaire",
  "0": "Maternelle",
  "1": "Primaire",
  "2": "Secondaire",
  "3": "Secondaire Supérieur",
};

function getLevel(item: ResultItem) {
  const levels = item.tags["school"] || item.tags["isced:level"];
  if (!levels) return;

  return levels.split(";").map((level) => (
    <span key="level" className="tag">
      {ISCED_LEVELS[level] ?? level}
    </span>
  ));
}

function SchoolList({ items }) {
  return (
    <table className="table-fill">
      <thead>
        <tr>
          <th></th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>CP</th>
          <th>Niveau</th>
          <th>Web</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const mainFase = item.tags["ref:fase"]?.split("/")[0];
          return (
            <tr key={item.osm_id}>
              <td>{getEditCell(item)}</td>
              <td>
                {item.tags.name}
                {item.tags["ref:fase"] && (
                  <>
                    <br />
                    <a
                      href={`http://www.enseignement.be/index.php?page=24797&etab_id=${mainFase}`}
                      className="text-muted"

                    >
                      Fase: {item.tags["ref:fase"]}
                    </a>
                  </>
                )}
              </td>
              <td>{getStreetCell(item)}</td>
              <td>{getCityCell(item)}</td>
              <td>{getLevel(item)}</td>
              <td>{getWebsiteCell(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SchoolList;
