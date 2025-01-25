import { renderPeople } from "./renderPeople.js";
import { renderPlanets } from "./renderPlanets.js";
import { renderFilms } from "./renderFilms.js";
import { renderVehicles } from "./renderVehicles.js";

export const render = (event) => {
  const id = event.target.dataset.id;
  const url = event.target.dataset.url;
  switch (id) {
    case "people":
      renderPeople(url, id);
      break;
    case "planets":
      renderPlanets(url);
      break;
    case "vehicles":
      renderVehicles(url);
      break;
    case "films":
      renderFilms(url);
    default:
      console.log("No page found");
  }
};
