import { renderData } from "./renderData.js";
import { urlConstructor, globalValues } from "./utils.js";

let currentID;

//Function to go to a specific page
const goToPage = (url, id, page) => {
  globalValues.currentPage = parseInt(page, 10);
  renderData(url, id);
};

//Function to go to the next page
const nextPage = (id, url) => {
  globalValues.currentPage++;
  renderData(url, id);
};

//Function to go to the previous page
const previousPage = (id, url) => {
  globalValues.currentPage--;
  renderData(url, id);
};

const renderNextPage = (id, totalPages, url) => {
  //------------------------//
  //Creating elements
  //------------------------//
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  const buttonIcon = document.createElement("img");

  //------------------------//
  //Adding classes
  //------------------------//
  button.classList.add("paginator__button", "paginator__button--next");
  buttonIcon.classList.add("paginator__icon", "paginator__icon--next");

  //------------------------//
  //Adding text and image
  //------------------------//
  buttonIcon.src = "./assets/icons/caret-right-solid.svg";
  button.innerText = "Next";

  //------------------------//
  //Adding event listener
  //------------------------//
  button.addEventListener("click", () => {
    nextPage(id, url);
  });

  // If the current page is the last page, disable the button
  if (globalValues.currentPage === totalPages) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }

  //Appending to the paginator and the button
  button.append(buttonIcon);
  paginator.append(button);
};

//Function to render the previous page button
const renderPreviousPage = (id, url) => {
  //------------------------//
  //Creating elements
  //------------------------//
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  const buttonIcon = document.createElement("img");

  button.classList.add("paginator__button", "paginator__button--previous");
  buttonIcon.classList.add("paginator__icon", "paginator__icon--previous");

  buttonIcon.src = "./assets/icons/caret-left-solid.svg";
  button.innerText = "Previous";

  //------------------------//
  //Adding event listener
  //------------------------//
  button.addEventListener("click", () => {
    previousPage(id, url);
  });

  // If the current page is the first page, disable the button
  if (globalValues.currentPage === 1) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }

  //Appending to the paginator and the button
  button.insertBefore(buttonIcon, button.firstChild);
  paginator.append(button);
};

//Function to render the paginator
export const renderPageinator = (id, totalPages, data) => {
  //If the id has changed, reset the current page to 1
  if (currentID !== id) {
    globalValues.currentPage = 1;
    currentID = id;
  }

  //------------------------//
  //Selecting elements
  //------------------------//
  const content = document.querySelector(".content");

  //------------------------//
  //Creating elements
  //------------------------//
  const paginator = document.createElement("section");

  //------------------------//
  //Adding classes
  //------------------------//
  paginator.className = "paginator";

  //------------------------//
  //Appending to the content
  //------------------------//
  content.append(paginator);

  //  //Render the previous page button
  renderPreviousPage(id, data.previous);

  //Render the page buttons
  for (let i = 0; i < totalPages; i++) {
    //Creating elements
    const button = document.createElement("button");

    //Adding classes
    button.className = "paginator__button";

    //Adding text
    button.innerText = i + 1;

    //Adding dataset
    button.dataset.page = i + 1;

    //If the current page is the active page, add the active class
    if (i + 1 === globalValues.currentPage) {
      button.classList.add("paginator__button--active");
    }

    //Adding event listener
    button.addEventListener("click", (event) => {
      event.preventDefault();

      //Get the page number from the dataset
      const page = event.target.dataset.page;

      //Construct the url
      const url = urlConstructor(id, page, globalValues.query);

      //Go to the page
      goToPage(url, id, page);
    });

    //Appending to the paginator
    paginator.append(button);
  }

  //Render the next page button
  renderNextPage(id, totalPages, data.next);
};
