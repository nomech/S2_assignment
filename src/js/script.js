import { renderNavButtons } from "./renderNavButtons.js";
import { renderData } from "./renderData.js";
import { renderSearch } from "./search.js";
import { globalValues, clearContent } from "./utils.js";

// Function to render the navigation buttons and search bar on page load
window.addEventListener("DOMContentLoaded", async () => {
  // Get the categories from the API and render the navigation buttons
  const categories = await renderNavButtons();

  // Get the content and intro elements
  const content = document.querySelector(".content");
  const intro = document.querySelector(".intro");

  // Render the search bar
  content.append(renderSearch(categories));

  // Event listener for the navigation buttons
  document.addEventListener("click", (event) => {
    // Check if the clicked element is a navigation button
    const classList = event.target.classList;
    if (classList.contains("nav-button")) {
      // Get the id and URL of the clicked button
      const id = event.target.dataset.id;
      const url = event.target.dataset.url;

      // If the home button is clicked, clear the content and render the search bar
      if (id === "home") {
        intro.classList.remove("intro--hide");
        clearContent();
        content.append(renderSearch(categories));
        return;
      }

      // If the intro is not hidden, hide it
      intro.classList.contains("intro--hide")
        ? null
        : intro.classList.add("intro--hide");

      // Set the current page to 1, search to false, and remove the content--limited class
      globalValues.currentPage = 1;
      globalValues.search = false;
      content.classList.remove("content--limited");

      // Render the data based on the URL and ID of the clicked button
      renderData(url, id);

      // Toggle mobile navigation menu
    } else if (classList.contains("nav__menu")) {
      const nav = document.querySelector(".nav");
      nav.classList.toggle("nav--open");
    }
  });
});
