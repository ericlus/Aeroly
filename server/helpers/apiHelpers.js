const axios = require("axios");
const apiKey = require("../config.js");
const qs = require("querystring");

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

const createSession = (
  originPlace,
  destinationPlace,
  cabinClass,
  adults,
  outboundDate,
  inboundDate
) => {
  return axios.post(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
    qs.stringify({
      inboundDate: inboundDate,
      cabinClass: cabinClass,
      children: "0",
      infants: "0",
      country: "US",
      currency: "USD",
      locale: "en-US",
      originPlace: originPlace,
      destinationPlace: destinationPlace,
      outboundDate: outboundDate,
      adults: adults.toString()
    }),
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": apiKey["X-RapidAPI-Host"],
        "X-RapidAPI-Key": apiKey["X-RapidAPI-Key"]
      }
    }
  );
};

const pollSession = sessionId => {
  return axios.get(
    `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${sessionId}`,
    {
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Host": apiKey["X-RapidAPI-Host"],
        "X-RapidAPI-Key": apiKey["X-RapidAPI-Key"]
      }
    }
  );
};

module.exports = {
  listPlaces,
  getQuotes,
  getRoutes,
  createSession,
  pollSession
};
