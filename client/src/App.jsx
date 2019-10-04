import React, { useState } from "react";
import Search from "./Search.jsx";
import moment from "moment";
import axios from "axios";
import FlightList from "./FlightList.jsx";

const App = () => {
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [departDate, setDepartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [returnDate, setReturnDate] = useState(
    moment(new Date())
      .add("days", 7)
      .format("YYYY-MM-DD")
  );
  const [cabin, setCabin] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [view, setView] = useState("HOME");
  const [liveResults, setLiveResults] = useState({});
  const [agents, setAgents] = useState([]);
  const [legs, setLegs] = useState([]);
  const [carriers, setCarriers] = useState([]);

  const changeFromDestination = destination => {
    setFromDestination(destination);
  };

  const changeToDestination = destination => {
    setToDestination(destination);
  };

  const changeDepartDate = date => {
    setDepartDate(date);
  };

  const changeReturnDate = date => {
    setReturnDate(date);
  };

  const changeCabin = cabin => {
    setCabin(cabin);
  };

  const changeAdults = number => {
    setAdults(number);
  };

  const searchFlight = () => {
    setView("SEARCHED");
    axios
      .post("/search", {
        fromDestination: fromDestination,
        toDestination: toDestination,
        departDate: departDate,
        returnDate: returnDate,
        cabin: cabin,
        adults: adults
      })
      .then(response => {
        setLiveResults(response.data);
        setAgents(response.data.Agents);
        setLegs(response.data.Legs);
        setCarriers(response.data.Carriers);
        if (response.data.Status === "UpdatesPending") {
          setTimeout(() => {
            return searchFlight();
          }, 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Aeroly</h1>
      {view === "HOME" ? (
        <Search
          changeFromDestination={changeFromDestination}
          changeToDestination={changeToDestination}
          changeDepartDate={changeDepartDate}
          changeReturnDate={changeReturnDate}
          searchFlight={searchFlight}
          changeCabin={changeCabin}
          changeAdults={changeAdults}
        />
      ) : null}
      {view === "SEARCHED" ? (
        <FlightList
          liveResults={liveResults}
          agents={agents}
          legs={legs}
          carriers={carriers}
        />
      ) : null}
    </div>
  );
};

export default App;
