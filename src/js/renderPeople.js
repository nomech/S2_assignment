import {
  sortData,
  clearContent,
  toggleLoading,
  appendSubDataName,
} from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

//Renders people data fetched from the Star Wars API
export const renderPeople = async (url) => {
  clearContent();

  const content = document.querySelector(".content");

  //Check if the data is already cached
  var loading = true;
  toggleLoading(loading);
  const peopleData = await getStarWarsData(url);

  //Sort the people data
  const peopleResults = sortData(peopleData.results);

  //Create a container for the people data
  const personContainer = document.createElement("div");
  personContainer.className = "data-container";

  //Iterate over the people data and create a card for each person
  for (const person of peopleResults) {
    //Get the relevant subdata
    const speciesValue = (await getSubData(person.species)) || "Unknown";
    const homeworldValue = (await getSubData(person.homeworld)) || "Unknown";
    const films = await appendSubDataName(person.films);
    const vehicals = await appendSubDataName(person.vehicles);
    const starships = await appendSubDataName(person.starships);

    //------------------------//
    //Create card elements
    //------------------------//
    const personCard = document.createElement("div");
    const name = document.createElement("p");
    const personInfoContainer = document.createElement("span");
    const personInfo = document.createElement("p");
    const birthYear = document.createElement("p");
    const species = document.createElement("p");
    const homeworld = document.createElement("p");
    const filmsText = document.createElement("p");
    const filmsContainer = document.createElement("div");
    const vehiclesText = document.createElement("p");
    const vehiclesContainer = document.createElement("div");
    const starshipsText = document.createElement("p");
    const starshipsContainer = document.createElement("div");

    //------------------------//
    //Adding classes
    //------------------------//
    personCard.className = "card";
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
    name.innerHTML = person.name;
    personInfo.innerText = `${person.birth_year} | ${speciesValue.name} | ${homeworldValue.name}`;
    filmsText.innerText = "Appears in:";
    vehiclesText.innerText = "Drives:";
    starshipsText.innerText = "Flies:";

    //Append the card elements to the card

    personInfoContainer.append(personInfo);
    personCard.append(name, personInfoContainer);
    if (films) {
      filmsContainer.append(filmsText, films);
      personCard.append(filmsContainer);
    }

    if (vehicals) {
      vehiclesContainer.append(vehiclesText, vehicals);
      personCard.append(vehiclesContainer);
    }

    if (starships) {
      starshipsContainer.append(starshipsText, starships);
      personCard.append(starshipsContainer);
    }
    personContainer.append(personCard);
  }

  loading = false;
  toggleLoading(loading);

  content.append(personContainer);
};
