const axios = require("axios");
const apiKey = require("../config.js");

const listPlaces = place => {
  return axios.get(
    `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${place}`,
    {
      headers: apiKey
    }
  );
};

const getQuotes = () => {
  return axios.get(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-10-10",
    {
      headers: apiKey
    }
  );
};

const getRoutes = () => {
  return axios.get(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/2019-10-10",
    {
      headers: apiKey
    }
  );
};

module.exports = { listPlaces, getQuotes, getRoutes };
