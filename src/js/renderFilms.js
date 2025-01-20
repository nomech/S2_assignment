import { clearContent, toggleLoading } from "./utils";
import { getStarWarsData } from "./dataFetchers.js";

export const renderFilms = async (url) => {
  //Clear the content of the app
  clearContent();

  var loading = true;
  toggleLoading(loading);

  const content = document.querySelector(".content");
  //Check if the data is already cached
  const data = await getStarWarsData(url);

  const sortedData = data.results;
  const dataContainer = document.createElement("div");
  dataContainer.className = "data-container";

  for (const item of sortedData) {
    //------------------------//
    //Create card elements
    //------------------------//
    const card = document.createElement("div");
    const name = document.createElement("p");
    const population = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    card.className = "card";
    name.className = "data-card__name";
    population.className = "data-card__population";

    //------------------------//
    //Adding text content
    //------------------------//

    name.innerHTML = item.title;

    //Append the card elements to the card
    card.append(name, population);
    console.log(card);

    dataContainer.append(card);
  }

  loading = false;
  toggleLoading(loading);
  content.append(dataContainer);
};
