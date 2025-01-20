export const getSwapiData = async () => {
  const baseUrl = "https://swapi.py4e.com/api/";
  const backupUrl = "https://www.swapi.tech/api/";
  try {
    let response = await fetch(baseUrl);
    // Try backup URL if the first one fails

    if (!response.ok) {
      response = await fetch(backupUrl);
      // Backupdata is in a different format than the original data, so we need to extract the result array
      const backupData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return backupData.result;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from SWAPI:`, error);
    throw error;
  }
};

//Fetches data from the Star Wars API
export const getStarWarsData = async (endpoint) => {
  //try to fetch data from the Star Wars API
  try {
    const response = await fetch(`${endpoint}`);

    //If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //Cache the fetched data
    return data;

    //If an error occurs, log the error to the console and throw the error
  } catch (error) {
    console.error(`Failed to fetch data from endpoint "${endpoint}":`, error);
    throw error;

    //Finally, log a message to the console to indicate that the data fetching was executed
  } finally {
    console.info("Data fetching was executed");
  }
};

//Fetches species data from the Star Wars API based on the species URL provided in the people data
export const getSubData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch subdata from endpoint "${url}":`, error);
    throw error;
  }
};
