import {
  sortData,
  clearContent,
  toggleLoading,
  sortDataByEpisode,
  numberFormatter,
  imageLibrary,
  globalValues,
} from "./utils.js";
import { getStarWarsData, getSubData } from "./dataFetchers.js";
import { renderPageinator } from "./paginator.js";
import { renderSearch } from "./search.js";

let totalRecords = 0;
let totalPages = 0;

let starWarsData;

//Renders people data fetched from the Star Wars API
const renderData = async (url, id, categories) => {
  //Get the content element
  const content = document.querySelector(".content");

  //Check if the data is already cached
  let loading = true;
  toggleLoading(loading);
  starWarsData = await getStarWarsData(url);

  //Sort the data based on the id
  let results;
  if (id === "films") {
    results = sortDataByEpisode(starWarsData.results);
  } else {
    results = sortData(starWarsData.results);
  }

  totalRecords = starWarsData.count;
  totalPages = Math.floor(totalRecords / results.length);

  //Create a container for the people data
  const dataContainer = document.createElement("section");
  dataContainer.className = "data-container";
  if (totalRecords === 0) {
    const noResults = document.createElement("h2");
    noResults.innerText = "No results found!";
    noResults.className = "no-results";
    noResults.style.textAlign = "center";

    dataContainer.append(noResults);
  }

  //Iterate over the people data and create a card for each person
  for (const data of results) {
    //------------------------//
    //Initlize variables and set options for the information box based on the id
    //------------------------//
    let speciesValue;
    let homeworldValue;
    let option1;
    let option2;
    let option3;
    let option4;
    let option5;

    if (id === "people") {
      //Get the relevant subdata
      speciesValue = await getSubData(data.species.toString());
      homeworldValue = await getSubData(data.homeworld);

      option1 = `B. ${data.birth_year}`;
      option2 = speciesValue.name || "Unknown";
      option3 = `${data.gender}`;
      option4 = `${data.height}cm`;
      option5 = homeworldValue.name || "Unknown";
    } else if (id === "planets") {
      option1 = `Pop. ${numberFormatter(data.population)}`;
      option2 = data.climate;
      option3 = data.terrain;
      option4 = data.gravity;
      option5 = data.diameter;
    } else if (id === "films") {
      option1 = `Directed by: ${data.director} `;
      option2 = `Producer: ${data.producer}`;
      option3 = data.release_date;
      option4 = `Ep. ${data.episode_id}`;
      option5 = "";
    } else if (id === "vehicles") {
      option1 = data.model;
      option2 = data.manufacturer;
      option3 = `Cost: ${numberFormatter(data.cost_in_credits)}ᖬ`;
      option4 = `Crew: ${numberFormatter(data.crew)}`;
      option5 = `Passangers: ${numberFormatter(data.passengers)}`;
    }

    //------------------------//
    //Create card and card elements
    //------------------------//
    const card = document.createElement("div");
    const name = document.createElement("h2");
    const infoContainer = document.createElement("span");
    const info = document.createElement("p");
    const images = document.createElement("img");

    //------------------------//
    //Adding classes
    //------------------------//
    card.className = "card";
    name.className = "data-card__name";
    infoContainer.className = "data-card__info";
    info.className = "data-card__info-text";
    images.className = "data-card__images";

    //------------------------//
    //Adding datasets
    //------------------------//
    name.dataset.url = data.url;

    //------------------------//
    //Adding text content
    //------------------------//
    name.innerText = data.name || data.title;
    info.innerText = `${option1} | ${option2} | ${option3} | ${option4} | ${option5}`;

    //------------------------//
    //Set the image source based on the id
    //------------------------//

    //Split url into an array
    const splitUrl = data.url.split("/");
    console.log(globalValues.categories);

    if (globalValues.categories.includes(id)) {
      images.src =
        imageLibrary[id]?.[splitUrl[splitUrl.length - 2]] ||
        imageLibrary.placeholder;
    }

    //Append the info text to the info container
    infoContainer.append(info);

    //Append the card elements to the card
    card.append(name, infoContainer, images);

    //Append the card to the data container
    dataContainer.append(card);
  }

  //Set loading to false and toggle the loading spinner
  loading = false;

  //Clear the content right before rendering the new data to have a cleaner transition
  clearContent();

  //Toggle the loading spinner
  toggleLoading(loading);

  //Append the search bar and the data container to the content
  content.append(renderSearch(id), dataContainer);

  if (totalPages > 1) {
    renderPageinator(id, totalPages, starWarsData);
  }
};

const renderHome = (categories) => {
  clearContent();
  renderSearch(categories);
};

export { renderData, renderHome };
