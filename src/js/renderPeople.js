import { sortData, clearContent, toggleLoading, cachedData } from "./utils";
import { getStarWarsData, getSubData } from "./dataFetchers.js";

//Renders people data fetched from the Star Wars API
export const renderPeople = async (id, url) => {
  clearContent();


  const content = document.querySelector(".content");

  var loading = true;
  toggleLoading(loading);
  //Check if the data is already cached
  let peopleData;
  if (!cachedData[id]) {
    peopleData = await getStarWarsData(url);

    //If the data is not cached, fetch the data from the Star Wars API
  } else {
    peopleData = cachedData[id];
  }

  //Sort the people data
  const peopleResults = sortData(peopleData.results);

  //Create a container for the people data
  const personContainer = document.createElement("div");
  personContainer.className = "person-container";

  //Iterate over the people data and create a card for each person
  for (const person of peopleResults) {
    //Get the relevant subdata
    const speciesValue = (await getSubData(person.species)) || "Unknown";
    const homeworldValue = (await getSubData(person.homeworld)) || "Unknown";

    //------------------------//
    //Create card elements
    //------------------------//
    const personCard = document.createElement("div");
    const name = document.createElement("p");
    const species = document.createElement("p");
    const homeworld = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    personCard.className = "card";
    name.className = "data-card__name";
    species.className = "data-card__speices";
    homeworld.className = "data-card__homeworld";

    //------------------------//
    //Adding text content
    //------------------------//

    if (person.name) {
      name.innerHTML = person.name;
    }
    species.innerText = `Species: ${speciesValue.name}`;
    homeworld.innerText = `Homeworld: ${homeworldValue.name}`;

    //Append the card elements to the card
    personCard.append(name, species, homeworld);

    //Iterate over the films and add them to the card
    for (const film of person.films) {
      const filmData = (await getSubData(film)) || "None";
      const filmTitle = document.createElement("p");
      filmTitle.innerText = filmData.title;
      personCard.append(filmTitle);
    }

    personContainer.append(personCard);
  }

  loading = false;
  toggleLoading(loading);

  content.append(personContainer);
};
