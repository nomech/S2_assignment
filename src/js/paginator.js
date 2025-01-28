import { renderData } from "./renderData.js";
import { urlConstructor, searchStatus } from "./utils.js";

let currentPage = 1;
let currentID;

const goToPage = (url, id, page) => {
  currentPage = parseInt(page, 10);
  renderData(url, id);
};

const nextPage = (id, url) => {
  currentPage++;
  renderData(url, id);
};

const previousPage = (id, url) => {
  currentPage--;
  renderData(url, id);
};

const renderNextPage = (id, totalPages, url) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--next");
  button.innerText = "Next";
  button.addEventListener("click", () => {
    nextPage(id, url);
  });
  if (currentPage === totalPages) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

const renderPreviousPage = (id, url) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--previous");
  button.innerText = "Previous";
  button.addEventListener("click", () => {
    previousPage(id, url);
  });

  if (currentPage === 1) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

export const renderPageinator = (id, totalPages, data) => {
  if (currentID !== id) {
    currentPage = 1;
    currentID = id;
  }

  const content = document.querySelector(".content");
  const paginator = document.createElement("div");
  paginator.className = "paginator";
  content.append(paginator);
  let url = `https://swapi.py4e.com/api/${id}/?page=`;
  console.log(data.previous);

  renderPreviousPage(id, data.previous);

  for (let i = 0; i < totalPages; i++) {
    const button = document.createElement("button");
    button.className = "paginator__button";
    button.innerText = i + 1;
    button.dataset.page = i + 1;
    if (i + 1 === currentPage) {
      button.classList.add("paginator__button--active");
    }

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const page = event.target.dataset.page;
      const url = urlConstructor(id, page, searchStatus.query);

      goToPage(url, id, page);
    });
    paginator.append(button);
  }

  renderNextPage(id, totalPages, data.next);
};
