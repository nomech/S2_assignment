import { sortData, clearContent, toggleLoading } from "./utils";
import { getStarWarsData } from "./dataFetchers.js";

//Renders people data fetched from the Star Wars API
export const renderVehicles = async (url) => {
  clearContent();

  const content = document.querySelector(".content");

  let loading = true;
  toggleLoading(loading);

  const vehiclesData = await getStarWarsData(url);

  //Sort the people data
  const vehiclesResults = sortData(vehiclesData.results);

  //Create a container for the people data
  const vehiclesContainer = document.createElement("div");
  vehiclesContainer.className = "data-container";

  //Iterate over the people data and create a card for each person
  for (const vehicle of vehiclesResults) {
    //------------------------//
    //Create card elements
    //------------------------//
    const vehicleCard = document.createElement("div");
    const name = document.createElement("p");
    const model = document.createElement("p");
    const manufacturer = document.createElement("p");
    const costInCredits = document.createElement("p");
    const crewCapacity = document.createElement("p");
    const passengersCapacity = document.createElement("p");

    //------------------------//
    //Adding classes
    //------------------------//
    vehicleCard.className = "card";
    name.className = "data-card__name";
    model.className = "data-card__model";
    manufacturer.className = "data-card__manufacturer";
    costInCredits.className = "data-card__cost-in-credits";
    crewCapacity.className = "data-card__crew-capacity";
    passengersCapacity.className = "data-card__passengers-capacity";
        //------------------------//
    //Add datasets
    //------------------------//
    name.dataset.url = item.url;

    //------------------------//
    //Adding text content
    //------------------------//
    name.innerText = `${vehicle.name}`;
    model.innerText = `${vehicle.model}`;
    manufacturer.innerText = `Manufacturer: ${vehicle.manufacturer}`;
    costInCredits.innerText = `Cost in credits: ${vehicle.cost_in_credits}`;
    crewCapacity.innerText = `Crew capacity: ${vehicle.crew}`;
    passengersCapacity.innerText = `Passengers capacity: ${vehicle.passengers}`;

    //Append the card elements to the card
    vehicleCard.append(
      name,
      model,
      manufacturer,
      costInCredits,
      crewCapacity,
      passengersCapacity
    );

    vehiclesContainer.append(vehicleCard);
  }

  loading = false;
  toggleLoading(loading);

  content.append(vehiclesContainer);
};
