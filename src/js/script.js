import { renderNavButtons } from "./renderNavButtons.js";
//import { renderSpecificItem } from "./utils.js";
import { renderData } from "./renderData.js";

window.addEventListener("DOMContentLoaded", () => {
  renderNavButtons();

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button")) {
      const id = event.target.dataset.id;
      const url = event.target.dataset.url;
      renderData(url, id);
    }

    /* if (event.target.classList.contains("data-card__name")) {
      renderSpecificItem(event.target.dataset.url);
    } */
  });
});
