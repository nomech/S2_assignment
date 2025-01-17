import { renderPeople } from "./renderPeople.js";
import { renderPlanets } from "./renderPlanets.js";


export const render = (event) => {
  const id = event.target.dataset.id;
  const url = event.target.dataset.url;
  switch (id) {
    case "people":
      renderPeople(id, url);
      break;
    case "planets":
      renderPlanets();
      break;
    case "vehicles":
      renderVehicles();
      break;
    default:
      console.log("No page found");
  }
};
