import { getSubData } from "./dataFetchers.js";

//Sorts the data fetched from the Star Wars API
export const sortData = (dataArray) => {
  const sortedData = dataArray.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sortedData;
};

//initialize the cached data object
export let cachedData = {};

//Fetches data from the Star Wars API
export const clearContent = () => {
  const content = document.querySelector(".content");
  content.innerHTML = "";
};

// Create a paragraph element for each key-value pair in the data
export const createInfo = (data, parent) => {
  for (const result of data.results) {
    for (const key in result) {
      const info = document.createElement("p");
      info.innerText = `${key}: ${result[key]}`;
      parent.append(info);
    }
  }
};

//Toggle the loading spinner
export const toggleLoading = (loading) => {
  const loadingElement = document.querySelector(".loading");
  if (loading) {
    loadingElement.classList.add("loading--show");
  } else {
    loadingElement.classList.remove("loading--show");
  }
};

export const appendSubDataName = async (array) => {
  if (array.length === 0) {
    return;
  }
  const list = document.createElement("ul");
  list.className = "data-card__list";
  for (const item of array) {
    const data = await getSubData(item);
    const listItem = document.createElement("li");
    const name = data.name || data.title;
    listItem.innerText = `${name}`;

    list.append(listItem);
  }
  return list;
};
