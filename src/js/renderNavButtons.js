import { getSwapiData } from "./dataFetchers";
import { globalValues } from "./utils";

export const renderNavButtons = async () => {
  const data = await getSwapiData();

  const categories = [];

  console.log(data);
  const navButtons = document.querySelector(".nav");

  const home = document.createElement("button");
  home.className = `nav-button nav-button__home`;
  home.role = "button";
  home.tabIndex = 0;
  home.innerText = `Home`;
  home.dataset.id = "home";
  navButtons.append(home);
  
  for (const key in data) {
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

      navButtons.append(button);

      button.dataset.id = key;
      button.dataset.url = data[key];
    }
  }
  globalValues.categories = categories;
  return categories;
};
