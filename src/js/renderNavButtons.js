import { getSwapiData } from "./dataFetchers";

export const renderNavButtons = async () => {
  const data = await getSwapiData();

  const navButtons = document.querySelector(".nav-buttons");
  for (const key in data) {
    if (key !== "species" && key !== "starships") {
      const listItem = document.createElement("li");
      const button = document.createElement("button");

      navButtons.append(listItem);
      listItem.append(button);

      listItem.className = `nav-buttons__listItem`;
      button.className = `button button__${key}`;

      button.innerText = `${key}`;

      button.dataset.id = key;
      button.dataset.url = data[key];
    }
  }
};
