import { sortData, clearContent, toggleLoading } from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

export const renderPlanets = async (url) => {
  //Clear the content of the app
  clearContent();

  let loading = true;
  toggleLoading(loading);

  const content = document.querySelector(".content");
  //Check if the data is already cached
  const planetsData = await getStarWarsData(url);
  const planetsResults = sortData(planetsData.results);

  //Create a container for the people data
  const planetContainer = document.createElement("div");
  planetContainer.className = "data-container";

  for (const planet of planetsResults) {
    //Check if numbers is NaN or not and format the number else display "Unknown" instead
    const populationData = !isNaN(parseInt(planet.population))
      ? parseInt(planet.population).toLocaleString()
      : "Unknown";

    //------------------------//
    //Create card elements
    //------------------------//
    const planetCard = document.createElement("div");
    const name = document.createElement("p");
    const population = document.createElement("p");
    const climate = document.createElement("p");
    const terrain = document.createElement("p");

    

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
    population.innerText = `Population: ${populationData}`;
    climate.innerText = `Climate: ${planet.climate}`;
    terrain.innerText = `Terrain: ${planet.terrain}`;


    //Append the card elements to the card
    planetCard.append(name, population, climate, terrain);

    for (const resident of planet.residents) {
      const residentData = (await getSubData(resident)) || "Unknown";
      const residentName = document.createElement("p");
      residentName.innerText = residentData.name;
      planetCard.append(residentName);
    }

    for (const film of planet.films) {
      const filmData = (await getSubData(film)) || "Unknown";
      const filmName = document.createElement("p");
      filmName.innerText = filmData.title;
      planetCard.append(filmName);
    }

    planetContainer.append(planetCard);
  }

  loading = false;
  toggleLoading(loading);
  content.append(planetContainer);
};
