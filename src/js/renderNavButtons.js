import { getSwapiData } from "./dataFetchers";
import { globalValues } from "./utils";

// Function to render the navigation buttons
export const renderNavButtons = async () => {

  // Fetch the data from the Star Wars API
  const data = await getSwapiData();

  // Create an array to store the categories
  const categories = [];

  // Get the navigation buttons element
  const navButtons = document.querySelector(".nav");

  // Create the home button
  const home = document.createElement("button");

  // Add classes and attributes to the home button
  home.className = `nav-button nav-button__home`;
  home.role = "button";
  home.tabIndex = 0;
  home.dataset.id = "home";

  // Add content to the home button
  home.innerText = `Home`;
  navButtons.append(home);
  
  // Loop through the data and create a button for each category
  for (const key in data) {
    // Skip the species and starships categories
    if (key !== "species" && key !== "starships") {
      categories.push(key);

      //------------------------//
      //Creating elements
      //------------------------//
      const button = document.createElement("button");

      //------------------------//
      //Adding classes
      //------------------------//
      button.className = `nav-button nav-button__${key}`;

      //------------------------//
      //Adding attributes
      //------------------------//
      button.role = "button";
      button.tabIndex = 0;

      //------------------------//
      //Adding content
      //------------------------//
      button.innerText = `${key}`;

      // Append the button to the navigation buttons element
      navButtons.append(button);

      // Add the category to the categories array
      button.dataset.id = key;
      button.dataset.url = data[key];
    }
  }

  // Return the categories array
  globalValues.categories = categories;
  return categories;
};
