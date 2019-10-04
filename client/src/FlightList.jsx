import React from "react";
import FlightListItem from "./FlightListItem.jsx";

const FlightList = ({ liveResults }) => {
  return (
    <div>
      <div>
        {console.log(liveResults.Status)}
        {liveResults.Status ? (
          <div>
            {liveResults.Status === "UpdatesPending" ? (
              <div>Loading...</div>
            ) : null}
            <div>
              {liveResults.Itineraries.map((flight, i) => {
                return <FlightListItem flight={flight} index={i} />;
              })}
            </div>
          </div>
        ) : (
          <div>Searching for Flights</div>
        )}
      </div>
    </div>
  );
};

export default FlightList;
