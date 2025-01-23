import {
  clearContent,
  toggleLoading,
  sortDataByEpisode,
  appendSubDataName,
} from "./utils";
import { getStarWarsData } from "./dataFetchers.js";

export const renderFilms = async (url) => {
  //Clear the content of the app
  clearContent();

  let loading = true;
  toggleLoading(loading);

  const content = document.querySelector(".content");
  //Check if the data is already cached
  const data = await getStarWarsData(url);
  const sortedData = sortDataByEpisode(data.results);
  const dataContainer = document.createElement("div");
  dataContainer.className = "data-container";

  for (const item of sortedData) {
    //Get the relevant subdata
    const characters = await appendSubDataName(item.characters);

    //------------------------//
    //Create card elements
    //------------------------//
    const card = document.createElement("div");
    const title = document.createElement("p");
    const director = document.createElement("p");
    const releaseDate = document.createElement("p");
    const producer = document.createElement("p");
    const episode = document.createElement("p");
    const charactersText = document.createElement("p");
    const charactersContainer = document.createElement("div");

    //------------------------//
    //Adding classes
    //------------------------//
    card.className = "card";
    title.className = "data-card__name";
    director.className = "data-card__director";
    releaseDate.className = "data-card__release-date";
    producer.className = "data-card__producer";
    episode.className = "data-card__episode";
    charactersContainer.className = "data-card__characters-container";
    charactersText.className = "data-card__characters";
    //------------------------//
    //Add datasets
    //------------------------//
    title.dataset.url = item.url;

    //------------------------//
    //Adding text content
    //------------------------//

    title.innerText = item.title;
    episode.innerText = `Episode: ${item.episode_id}`;
    director.innerText = `Directed by: ${item.director}`;
    releaseDate.innerText = `Release date: ${item.release_date
      .split("-")
      .reverse()
      .join("-")
      .replaceAll("-", ".")}`;
    producer.innerText = `Produced by: ${item.producer}`;
    charactersText.innerText = `Characters:`;

    //Append the card elements to the card
    card.append(title, episode, director, producer, releaseDate);

    if (characters) {
      charactersContainer.append(characters);
      card.append(charactersText, charactersContainer);
    }

    dataContainer.append(card);
  }

  loading = false;
  toggleLoading(loading);
  content.append(dataContainer);
};


