import { renderPeople } from "./renderPeople.js";
import { renderPlanets } from "./renderPlanets.js";
import { renderData } from "./renderFilms.js";

export const render = (event) => {
  const id = event.target.dataset.id;
  const url = event.target.dataset.url;
  switch (id) {
    case "people":
      renderPeople(id, url);
      break;
    case "planets":
      renderPlanets(id, url);
      break;
    case "vehicles":
      renderVehicles(id, url);
      break;
    case "films":
      renderData(id, url);
    default:
      console.log("No page found");
  }
};
