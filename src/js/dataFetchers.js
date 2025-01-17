import { cachedData } from "./utils.js";

let loading = false;
//Fetches data from the Star Wars API
export const getStarWarsData = async (endpoint) => {
  const baseUrl = "https://swapi.py4e.com/api/";

  //try to fetch data from the Star Wars API
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);

    //If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //Cache the fetched data
    cachedData[endpoint] = data;
    return data;

    //If an error occurs, log the error to the console
  } catch (error) {
    console.error(`Failed to fetch data from endpoint "${endpoint}":`, error);

    //Finally, log a message to the console to indicate that the data fetching was executed
  } finally {
    console.info("Data fetching was executed");
  }
};

//Fetches species data from the Star Wars API based on the species URL provided in the people data
export const getSubData = async (species) => {
  try {
    const response = await fetch(species);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from endpoint "${species}":`, error);
    throw error;
  }
};
