import { sortData, clearContent, toggleLoading } from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

export const renderPlanets = async (url) => {
  //Clear the content of the app
  clearContent();

  var loading = true;
  toggleLoading(loading);

  const content = document.querySelector(".content");
  //Check if the data is already cached
  const planetsData = await getStarWarsData(url);

  const planetsResults = sortData(planetsData.results);

  const planetContainer = document.createElement("div");
  planetContainer.className = "data-container";

  for (const planet of planetsResults) {
    //------------------------//
    //Create card elements
    //------------------------//
    const planetCard = document.createElement("div");
    const name = document.createElement("p");
    const population = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    planetCard.className = "card";
    name.className = "data-card__name";
    population.className = "data-card__population";

    //------------------------//
    //Adding text content
    //------------------------//
    name.innerHTML = planet.name;
    population.innerText = `Population: ${planet.population}`;

    //Append the card elements to the card
    planetCard.append(name, population);

    for (const resident of planet.residents) {
      const residentData = (await getSubData(resident)) || "Unknown";
      const residentName = document.createElement("p");
      residentName.innerText = residentData.name;
      planetCard.append(residentName);
    }

    planetContainer.append(planetCard);
  }

  loading = false;
  toggleLoading(loading);
  content.append(planetContainer);
};
