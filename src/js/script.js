import { render } from "./render.js";
import { renderNavButtons } from "./renderNavButtons.js";
import { renderSpecificItem } from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  renderNavButtons();

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button")) {
      render(event);
    }

    if (event.target.classList.contains("data-card__name")) {
      renderSpecificItem(event.target.dataset.url);
    }
  });
});
