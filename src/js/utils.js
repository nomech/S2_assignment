import { getStarWarsData, getSubData } from "./dataFetchers.js";

//Sorts the data fetched from the Star Wars API
export const sortData = (dataArray) => {
  const sortedData = dataArray.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sortedData;
};

export const sortDataByEpisode = (dataArray) => {
  const sortedData = dataArray.sort((a, b) => {
    return a.episode_id - b.episode_id;
  });

  return sortedData;
};

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

    listItem.dataset.url = item;
    listItem.innerText = `${name}`;

    list.append(listItem);
  }
  return list;
};

export const renderSpecificItem = async (url) => {
  clearContent();
  const content = document.querySelector(".content");
  const data = await getStarWarsData(url);
  const dataContainer = document.createElement("div");

  for (const key in data) {
    if (key === "url") {
      continue;
    }

    const info = document.createElement("p");
    if (Array.isArray(data[key])) {
      if (data[key].length > 0) {
        const list = document.createElement("ul");
        list.className = "data-card__list";

        for (const item of data[key]) {
          const subData = await getSubData(item);
          const listItem = document.createElement("li");
          listItem.innerText = subData.name || subData.title;
          list.append(listItem);
          dataContainer.append(list);
        }
      }
      //check if value is a url
    } else if (data[key].includes("https://")) {
      const subData = await getSubData(data[key]);
      info.innerText = `${key}: ${subData.name || subData.title}`;
      dataContainer.append(info);
    } else {
      info.innerText = `${key.replaceAll("_", " ")}: ${data[key]}`;
      dataContainer.append(info);
    }
  }
  content.append(dataContainer);
};
