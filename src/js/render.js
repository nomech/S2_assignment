import { renderPeople } from "./renderPeople.js";
import { renderPlanets } from "./renderPlanets.js";
import { renderVehicles } from "./renderVehicles.js";




export const render = (event) => {
  const page = event.target.dataset.page;
  switch (page) {
    case "people":
      renderPeople();
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
