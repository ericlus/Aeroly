import React, { useState } from "react";
import Search from "./Search.jsx";
import moment from "moment";
import axios from "axios";
import FlightList from "./FlightList.jsx";

const App = () => {
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [departDate, setDepartDate] = useState(
    moment(new Date())
      .add("hours", 1)
      .format("YYYY-MM-DD")
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
  const [legs, setLegs] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(false);

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

  const changeView = view => {
    if (view === "HOME") {
      setView(view);
      setError(false);
    } else {
      setView(view);
    }
  };

  const searchFlight = () => {
    changeView("SEARCHED");
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
        if (response.data === "ERROR") {
          setError(true);
        } else {
          setLiveResults(response.data);
          setLegs(response.data.Legs);
          setCarriers(response.data.Carriers);
          setPlaces(response.data.Places);
          if (response.data.Status === "UpdatesPending") {
            setTimeout(() => {
              return searchFlight();
            }, 5000);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Aeroly</h1>
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
          legs={legs}
          carriers={carriers}
          places={places}
          error={error}
          changeView={changeView}
        />
      ) : null}
    </div>
  );
};

export default App;
