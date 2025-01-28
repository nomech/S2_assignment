import { renderData } from "./renderData.js";
import { urlConstructor, searchStatus } from "./utils.js";

export const renderSearch = (categories) => {
  //------------------------//
  //Create the search container
  //------------------------//

  const searchContainer = document.createElement("div");
  const search = document.createElement("input");
  const searchText = document.createElement("p");
  const searchSelect = document.createElement("select");
  const searchButton = document.createElement("button");

  //------------------------//
  //Adding classes
  //------------------------//

  searchContainer.classList.add("search");
  searchText.classList.add("search__text");
  searchSelect.classList.add("search__select");
  search.classList.add("search__input");
  searchButton.classList.add("search__button");

  //------------------------//
  //Adding content
  //------------------------//
  searchText.innerText = "Search";
  searchButton.innerText = "Search";
  search.placeholder = "Search...";

  //------------------------//
  //Adding options to the select element
  //------------------------//

  if (typeof categories === "string") {
    const option = document.createElement("option");
    option.value = categories;
    option.innerText = categories;
    searchSelect.append(option);
    searchSelect.disabled = true;
  } else {
    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.innerText = category;
      searchSelect.append(option);
    }
  }
  //------------------------//
  //Event listener
  //------------------------//
  searchButton.addEventListener("click", submitSearch);

  searchContainer.append(searchText, searchSelect, search, searchButton);
  return searchContainer;
};

const submitSearch = async (event) => {
  event.preventDefault();
  searchStatus.search = true;
  const search = document.querySelector(".search__input");
  const category = document.querySelector(".search__select").value;
  const url = urlConstructor(category, 1, search.value);

  renderData(url, category);
};
