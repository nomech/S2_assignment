import { clearContent, toggleLoading, cachedData, } from "./utils";
import { getStarWarsData } from "./dataFetchers.js";

export const renderData = async (id, url) => {
  //Clear the content of the app
  clearContent();

  var loading = true;
  toggleLoading(loading);

  const content = document.querySelector(".content");
  //Check if the data is already cached
  let data;

  //If the data is not cached, fetch the data from the Star Wars API
  if (!cachedData[id]) {
    data = await getStarWarsData(url);
    //else use the cached data
  } else {
    data = cachedData[id];
  }

  const sortedData = data.results;
  const dataContainer = document.createElement("div");
  dataContainer.className = "data-container";

  for (const item of sortedData) {
    let card;
    if (id.toLowerCase() === "films") {
      card = renderFilm(item);
    }
    dataContainer.append(card);
  }

  loading = false;
  toggleLoading(loading);
  content.append(dataContainer);
};

const renderFilm = (data) => {
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

  name.innerHTML = data.title;

  //Append the card elements to the card
  card.append(name, population);
  console.log(card);

  return card;
};
