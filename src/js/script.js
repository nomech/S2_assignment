import { renderNavButtons } from "./renderNavButtons.js";
//import { renderSpecificItem } from "./utils.js";
import { renderData } from "./renderData.js";
import { renderSearch } from "./search.js";
import { globalValues } from "./utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const categories = await renderNavButtons();
  const content = document.querySelector(".content");
  content.append(renderSearch(categories));
  
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-button")) {
      const id = event.target.dataset.id;
      const url = event.target.dataset.url;
      globalValues.currentPage = 1;
      globalValues.search = false;
      renderData(url, id);
    }
  });
});
