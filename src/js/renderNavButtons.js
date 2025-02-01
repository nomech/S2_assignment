import { getSwapiData } from "./dataFetchers";

export const renderNavButtons = async () => {
  const data = await getSwapiData();

  const categories = [];

  const navButtons = document.querySelector(".nav");
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

  return categories;
};
