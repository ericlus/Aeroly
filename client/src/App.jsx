import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    axios
      .get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-10-10?inboundpartialdate=2019-12-01",
        {
          params: {},
          headers: {
            "X-RapidAPI-Host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "X-RapidAPI-Key":
              "576ba02991msh40bfe0a4e429dc4p1fe089jsn5a1c3ff524a1"
          }
        }
      )
      .then(result => {
        console.log(result);
      });
  }, []);
  return (
    <div>
      <div>Hello World</div>
    </div>
  );
};

export default App;
