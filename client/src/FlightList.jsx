import React from "react";
import FlightListItem from "./FlightListItem.jsx";

const FlightList = ({ liveResults, agents, legs, carriers }) => {
  return (
    <div>
      <div>
        {liveResults.Status ? (
          <div>
            {liveResults.Status === "UpdatesPending" ? (
              <div>Loading...</div>
            ) : null}
            <div>
              {liveResults.Itineraries.map((flight, i) => {
                return (
                  <FlightListItem
                    flight={flight}
                    index={i}
                    agents={agents}
                    legs={legs}
                    carriers={carriers}
                  />
                );
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
