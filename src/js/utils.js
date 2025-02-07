import { getStarWarsData, getSubData } from "./dataFetchers.js";

// Object containing the image paths for the different categories
const imageLibrary = {
  people: {
    1: "./assets/images/LukeSkywalker.webp",
    2: "./assets/images/C3PO.webp",
    3: "./assets/images/R2D2.webp",
    4: "./assets/images/darthVader.webp",
    5: "./assets/images/leiaOrgana.webp",
    6: "./assets/images/OwenLars.webp",
    7: "./assets/images/BeruWhitesunLars.webp",
    8: "./assets/images/R5D4.webp",
    9: "./assets/images/BiggsDarklighter.webp",
    10: "./assets/images/obiWanKenobi.webp",
  },
  planets: {
    1: "./assets/images/tatooine.webp",
    2: "./assets/images/alderaan.webp",
    3: "./assets/images/yavinIV.webp",
    4: "./assets/images/hoth.webp",
    5: "./assets/images/dagobah.webp",
    6: "./assets/images/bespin.webp",
    7: "./assets/images/endor.webp",
    8: "./assets/images/naboo.webp",
    9: "./assets/images/coruscant.webp",
    10: "./assets/images/kamino.webp",
  },
  films: {
    1: "./assets/images/episode4.webp",
    2: "./assets/images/episode5.webp",
    3: "./assets/images/episode6.webp",
    4: "./assets/images/episode1.webp",
    5: "./assets/images/episode2.webp",
    6: "./assets/images/episode3.webp",
    7: "./assets/images/episode7.webp",
  },
  vehicles: {
    4: "./assets/images/sandcrawler.webp",
    6: "./assets/images/t16.webp",
    7: "./assets/images/x34.webp",
    8: "./assets/images/tiefighter.webp",
    14: "./assets/images/snowspeeder.webp",
    16: "./assets/images/tiebomber.webp",
    18: "./assets/images/atat.webp",
    19: "./assets/images/atst.webp",
    20: "./assets/images/cloudcar.webp",
    24: "./assets/images/sailbarge.webp",
  },
  placeholder: "./assets/images/placeholder.webp",
};

// Object containing the global values
const globalValues = {
  search: false,
  query: "",
  url: "",
  currentPage: 1,
};

//Sorts the data fetched from the Star Wars API
const sortData = (dataArray) => {
  //Sort the data by name
  const sortedData = dataArray.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return sortedData;
};

//Sorts the data fetched from the Star Wars API by episode
const sortDataByEpisode = (dataArray) => {
  //Sort the data by episode
  const sortedData = dataArray.sort((a, b) => {
    return a.episode_id - b.episode_id;
  });

  return sortedData;
};

//Fetches data from the Star Wars API
const clearContent = () => {
  const content = document.querySelector(".content");
  content.innerHTML = "";
};

// Create a paragraph element for each key-value pair in the data
const createInfo = (data, parent) => {
  for (const result of data.results) {
    for (const key in result) {
      const info = document.createElement("p");
      info.innerText = `${key}: ${result[key]}`;
      parent.append(info);
    }
  }
};

//Toggle the loading spinner
const toggleLoading = (loading) => {
  const loadingElement = document.querySelector(".loading");
  //If loading is true, add the loading--show class, otherwise remove it
  if (loading) {
    loadingElement.classList.add("loading--show");
  } else {
    loadingElement.classList.remove("loading--show");
  }
};

//Fetches the sub data from the Star Wars API based on the URL provided and appends it to a list
const appendSubDataName = async (array) => {
  //If the array is empty, return
  if (array.length === 0) {
    return;
  }

  //Create a list element
  const list = document.createElement("ul");
  list.className = "data-card__list";
  for (const item of array) {
    //Fetch the data from the provided URL
    const data = await getSubData(item);
    const listItem = document.createElement("li");
    const name = data.name || data.title;

    //Add the name and URL to the list item
    listItem.dataset.url = item;
    listItem.innerText = `${name}`;

    //Append the list item to the list
    list.append(listItem);
  }
  //Return the list
  return list;
};

//Formats the number to include commas
const numberFormatter = (number) => {
  //If the number is not a number, return "Unknown"
  return !isNaN(parseInt(number))
    ? parseInt(number).toLocaleString()
    : "Unknown";
};

//Constructs a url based on pagination and if search is being used
const urlConstructor = (id, currentPage, query) => {
  //If search is true, construct the URL with the search query
  if (globalValues.search) {
    //Set the global values
    globalValues.query = query;
    globalValues.currentPage = currentPage;

    globalValues.url = `https://swapi.py4e.com/api/${id}/?search=${query}&page=${currentPage}`;
  } else {
    globalValues.url = `https://swapi.py4e.com/api/${id}/?page=${currentPage}`;
  }
  return globalValues.url;
};

export {
  imageLibrary,
  globalValues,
  sortData,
  sortDataByEpisode,
  clearContent,
  createInfo,
  toggleLoading,
  appendSubDataName,
  numberFormatter,
  urlConstructor,
};
