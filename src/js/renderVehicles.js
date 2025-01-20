import {
  sortData,
  clearContent,
  toggleLoading,
  appendSubDataName,
} from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

//Renders people data fetched from the Star Wars API
export const renderVehicles = async (url) => {
  clearContent();

  const content = document.querySelector(".content");

  var loading = true;
  toggleLoading(loading);

  const vehiclesData = await getStarWarsData(url);

  //Sort the people data
  const vehiclesResults = sortData(vehiclesData.results);

  //Create a container for the people data
  const vehiclesContainer = document.createElement("div");
  vehiclesContainer.className = "data-container";

  //Iterate over the people data and create a card for each person
  for (const vehicle of vehiclesResults) {
    //Get the relevant subdata

    //------------------------//
    //Create card elements
    //------------------------//
    const vehicleCard = document.createElement("div");
    const name = document.createElement("p");
    const personInfo = document.createElement("p");
    const birthYear = document.createElement("p");
    const species = document.createElement("p");
    const homeworld = document.createElement("p");
    const filmsText = document.createElement("p");
    const filmsContainer = document.createElement("div");
    const vehiclesText = document.createElement("p");
    const starshipsText = document.createElement("p");
    const starshipsContainer = document.createElement("div");

    //------------------------//
    //Adding classes
    //------------------------//
    vehicleCard.className = "card";
    name.className = "data-card__name";
    birthYear.className = "data-card__birth-year";
    species.className = "data-card__speices";
    homeworld.className = "data-card__homeworld";
    filmsContainer.className =
      "data-card__container data-card__container--films";
    filmsText.className = "data-card__text--films";
    vehiclesContainer.className =
      "data-card__container data-card__card__container--vehicles";
    vehiclesText.className = "data-card__text--vehicles";
    starshipsContainer.className =
      "data-card__container data-card__card__container--starships";
    starshipsText.className = "data-card__text--starships";

    //------------------------//
    //Adding text content
    //------------------------//
    name.innerHTML = vehicle.name;
    personInfo.innerText = `${vehicle.name}`;
    filmsText.innerText = "Appears in:";
    vehiclesText.innerText = "Drives:";
    starshipsText.innerText = "Flies:";

    //Append the card elements to the card
    vehicleCard.append(name);
    vehiclesContainer.append(vehicleCard);
  }

  loading = false;
  toggleLoading(loading);

  content.append(vehiclesContainer);
};
