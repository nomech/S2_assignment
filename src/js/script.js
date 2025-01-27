import { renderNavButtons } from "./renderNavButtons.js";
//import { renderSpecificItem } from "./utils.js";
import { renderData } from "./renderData.js";
import { renderSearch } from "./search.js";

window.addEventListener("DOMContentLoaded", async () => {
  const categories = await renderNavButtons();
  const content = document.querySelector(".content");
  content.append(renderSearch(categories));
  
  


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-button")) {
      const id = event.target.dataset.id;
      const url = event.target.dataset.url;
      renderData(url, id);
    }
  });
});
