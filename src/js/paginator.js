import { renderData } from "./renderData.js";

let currentPage = 1;
let currentID;

const goToPage = (url, id, page) => {
  currentPage = parseInt(page, 10);
  renderData(url, id);
};

const nextPage = (id) => {
  currentPage++;
  let url = `https://swapi.py4e.com/api/${id}/?page=${currentPage}`;
  goToPage(url, id, currentPage);
};

const previousPage = (id) => {
  currentPage--;
  let url = `https://swapi.py4e.com/api/${id}/?page=${currentPage}`;
  goToPage(url, id, currentPage);
};

const renderNextPage = (id, totalPages) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--next");
  button.innerText = "Next";
  button.addEventListener("click", () => {
    nextPage(id);
  });
  if (currentPage === totalPages) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

const renderPreviousPage = (id) => {
  const paginator = document.querySelector(".paginator");
  const button = document.createElement("button");
  button.classList.add("paginator__button", "paginator__button--previous");
  button.innerText = "Previous";
  button.addEventListener("click", () => {
    previousPage(id);
  });

  if (currentPage === 1) {
    button.disabled = true;
    button.classList.add("paginator__button--disabled");
  }
  paginator.append(button);
};

export const renderPageinator = (id, totalPages) => {
  if (currentID !== id) {
    currentPage = 1;
    currentID = id;
  }

  const content = document.querySelector(".content");
  const paginator = document.createElement("div");
  paginator.className = "paginator";
  content.append(paginator);
  let url = `https://swapi.py4e.com/api/${id}/?page=`;

  renderPreviousPage(id, totalPages);

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
      goToPage(`${url}${page}`, id, page);
    });
    paginator.append(button);
  }

  renderNextPage(id, totalPages);
};
