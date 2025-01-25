import {
  sortData,
  clearContent,
  toggleLoading,
  appendSubDataName,
} from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

//Renders people data fetched from the Star Wars API
export const renderPeople = async (url, id) => {
  clearContent();

  const content = document.querySelector(".content");

  //Check if the data is already cached
  let loading = true;
  toggleLoading(loading);
  const starWarsData = await getStarWarsData(url);

  //Sort the people data
  const results = sortData(starWarsData.results);

  //Create a container for the people data
  const personContainer = document.createElement("div");
  personContainer.className = "data-container";

  //Iterate over the people data and create a card for each person
  for (const data of results) {
    let speciesValue;
    let homeworldValue;

    //Get the relevant subdata
    if (id === "people") {
      speciesValue = (await getSubData(data.species)) || "Unknown";
      homeworldValue = (await getSubData(data.homeworld)) || "Unknown";
    }

    //------------------------//
    //Create card elements
    //------------------------//
    const card = document.createElement("div");
    const name = document.createElement("p");
    const personInfoContainer = document.createElement("span");
    const personInfo = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    card.className = "card";
    name.className = "data-card__name";
    personInfoContainer.className = "data-card__info";
    personInfo.className = "data-card__info-text";

    //------------------------//
    //Adding datasets
    //------------------------//
    name.dataset.url = data.url;

    //------------------------//
    //Adding text content
    //------------------------//
    name.innerText = data.name || data.title;

    if (id === "people") {
      personInfo.innerText = `${data.birth_year} | ${speciesValue.name} | ${homeworldValue.name}`;
    }
    //Append the card elements to the card
    personInfoContainer.append(personInfo);
    personCard.append(name, personInfoContainer);

    personContainer.append(personCard);
  }

  loading = false;
  toggleLoading(loading);

  content.append(personContainer);
};
