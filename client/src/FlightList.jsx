import React from "react";
import FlightListItem from "./FlightListItem.jsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const FlightList = ({ liveResults, agents, legs, carriers, places }) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        {liveResults.Status ? (
          <div>
            {liveResults.Status === "UpdatesPending" ? (
              <div>
                <CircularProgress className={classes.progress} />
              </div>
            ) : null}
            <Grid container justify="center">
              {/* <Grid item xs={12}> */}
              {liveResults.Itineraries.map((flight, i) => {
                return (
                  <FlightListItem
                    flight={flight}
                    index={i}
                    agents={agents}
                    legs={legs}
                    carriers={carriers}
                    places={places}
                    style={{ textAlign: "center" }}
                  />
                );
              })}
              {/* </Grid> */}
            </Grid>
          </div>
        ) : (
          <Grid container justify="center">
            <CircularProgress className={classes.progress} />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default FlightList;
