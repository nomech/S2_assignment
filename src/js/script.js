import { render } from "./render.js";
import { renderNavButtons } from "./renderNavButtons.js";

window.addEventListener("DOMContentLoaded", () => {
  renderNavButtons();

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button")) {
      render(event);
    }
  });
});
