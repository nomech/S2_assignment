import { renderData } from "./renderData.js";
import { urlConstructor, globalValues } from "./utils.js";

let currentID;

const goToPage = (url, id, page) => {
  globalValues.currentPage = parseInt(page, 10);
  renderData(url, id);
};

const nextPage = (id, url) => {
  globalValues.currentPage++;
  renderData(url, id);
};

const previousPage = (id, url) => {
  globalValues.currentPage--;
  renderData(url, id);
};

const renderNextPage = (id, totalPages, url) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  const buttonIcon = document.createElement("img");

  button.classList.add("paginator__button", "paginator__button--next");
  buttonIcon.classList.add("paginator__icon", "paginator__icon--next");

  buttonIcon.src = "./assets/icons/caret-right-solid.svg";
  button.innerText = "Next";
  button.addEventListener("click", () => {
    nextPage(id, url);
  });
  if (globalValues.currentPage === totalPages) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }

  button.append(buttonIcon);
  paginator.append(button);
};

const renderPreviousPage = (id, url) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  const buttonIcon = document.createElement("img");

  button.classList.add("paginator__button", "paginator__button--previous");
  buttonIcon.classList.add("paginator__icon", "paginator__icon--previous");

  buttonIcon.src = "./assets/icons/caret-left-solid.svg";
  button.innerText = "Previous";
  button.addEventListener("click", () => {
    previousPage(id, url);
  });

  if (globalValues.currentPage === 1) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }

  button.insertBefore(buttonIcon, button.firstChild);
  paginator.append(button);
};

export const renderPageinator = (id, totalPages, data) => {
  //If the id has changed, reset the current page to 1
  if (currentID !== id) {
    globalValues.currentPage = 1;
    currentID = id;
  }

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
  renderPreviousPage(id, data.previous);

  for (let i = 0; i < totalPages; i++) {
    const button = document.createElement("button");
    button.className = "paginator__button";
    button.innerText = i + 1;
    button.dataset.page = i + 1;
    if (i + 1 === globalValues.currentPage) {
      button.classList.add("paginator__button--active");
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const page = event.target.dataset.page;
      const url = urlConstructor(id, page, globalValues.query);

      goToPage(url, id, page);
    });
    paginator.append(button);
  }

  renderNextPage(id, totalPages, data.next);
};
