import { ResultItem } from "../lib/fetch-overpass";
import {
  getCityCell,
  getEditCell,
  getOpeningCell,
  getStreetCell,
  getWebsiteCell,
} from "./GenericList";

function getCuisineCell(item: ResultItem) {
  const cuisines = item.tags["cuisine"];
  if (!cuisines) return null;
  return  cuisines.split(";").map((cuisine) => (
    <span key="cuisine" className="tag">
      {cuisine}
    </span>
  ))
}

function RestaurantList({ items }) {
  return (
    <table className="table-fill">
      <thead>
        <tr>
          <th></th>
          <th>Nom</th>
          <th>Adresse</th>
          <th>CP</th>
          <th>Web</th>
          <th>Cuisine</th>
          <th>Ouvert ?</th>
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
              <td>{getCuisineCell(item)}</td>
              <td>{getOpeningCell(item)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RestaurantList;
