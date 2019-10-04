import React from "react";
import FlightListItem from "./FlightListItem.jsx";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

const FlightList = ({ liveResults, agents, legs, carriers }) => {
  return (
    <div>
      <div>
        {liveResults.Status ? (
          <div>
            {liveResults.Status === "UpdatesPending" ? (
              <div>Loading...</div>
            ) : null}
            <Grid container justify="center">
              <List>
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
              </List>
            </Grid>
          </div>
        ) : (
          <div>Searching for Flights</div>
        )}
      </div>
    </div>
  );
};

export default FlightList;
