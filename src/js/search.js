import { renderData } from "./renderData.js";
import { urlConstructor, globalValues } from "./utils.js";

const renderSearch = (categories) => {
  //------------------------//
  //Create the search container
  //------------------------//
  const searchContainer = document.createElement("section");
  const search = document.createElement("input");
  const searchSelect = document.createElement("select");
  const searchButton = document.createElement("button");
  const searchIcon = document.createElement("img");

  //------------------------//
  //Adding classes
  //------------------------//
  searchContainer.classList.add("search");
  searchSelect.classList.add("search__select");
  search.classList.add("search__input");
  searchButton.classList.add("search__button");
  searchIcon.classList.add("search__icon");

  //------------------------//
  //Adding content
  //------------------------//
  searchButton.innerText = "Search";
  search.placeholder = "Search...";

  //------------------------//
  //Adding attributes
  //------------------------//
  search.type = "text";
  searchSelect.name = "category";
  searchSelect.id = "category";
  searchSelect.required = true;
  searchButton.type = "submit";
  searchIcon.src = "./assets/icons/magnifying-glass-solid.svg";

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

  window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      submitSearch(event);
    }
  });

  // Add the search icon to the search button
  searchButton.insertBefore(searchIcon, searchButton.firstChild);
  searchContainer.append(searchSelect, search, searchButton);

  // Return the search container
  return searchContainer;
};

// Function to submit the search
const submitSearch = async (event) => {
  event.preventDefault();

  // Set the search to true, the current page to 1
  globalValues.search = true;
  globalValues.currentPage = 1;

  // Get the search input and category
  const search = document.querySelector(".search__input");
  const category = document.querySelector(".search__select").value;

  // Construct the URL
  const url = urlConstructor(category, 1, search.value);

  // If the search input is not empty, render the data
  if (search.value.length > 0) {
    renderData(url, category);
  }
};

export { renderSearch };
