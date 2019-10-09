import React from "react";
import moment from "moment";
import { Grid, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const FlightListItem = ({ flight, index, legs, carriers, places }) => {
  const findCarrier = (
    carrierId,
    arrival,
    departure,
    originStation,
    destinationStation
  ) => {
    const splitArrival = arrival.split("T");
    const splitDeparture = departure.split("T");
    const formatArrival = moment(splitArrival[1], "HH:mm").format("hh:mm a");
    const formatDeparture = moment(splitDeparture[1], "HH:mm").format(
      "hh:mm a"
    );
    let firstStation;
    let secondStation;

    for (let i = 0; i < places.length; i++) {
      if (places[i].Id === originStation) {
        firstStation = places[i].Code;
      }
      if (places[i].Id === destinationStation) {
        secondStation = places[i].Code;
      }
    }

    for (let i = 0; i < carriers.length; i++) {
      if (carriers[i].Id === carrierId) {
        return (
          <Grid container justify="center">
            <Grid item xs={4}>
              <img src={carriers[i].ImageUrl} />
            </Grid>
            <Grid item xs={4}>
              <h3>${flight.PricingOptions[0].Price}</h3>
            </Grid>
            <Grid item xs={4}>
              <a href={flight.PricingOptions[0].DeeplinkUrl}>
                <Button variant="outlined">Select</Button>
              </a>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px"
              }}
            >
              <div style={{ paddingRight: "10px" }}>
                Departure: {formatDeparture}
              </div>
              <div style={{ paddingLeft: "10px" }}>
                Arrival: {formatArrival}
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div style={{ paddingRight: "10px", fontWeight: "bold" }}>
                {secondStation}
              </div>
              <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                {firstStation}
              </div>
            </Grid>
          </Grid>
        );
      }
    }
  };

  const findLegs = legId => {
    for (let i = 0; i < legs.length; i++) {
      if (legs[i].Id === legId) {
        return findCarrier(
          legs[i].Carriers[0],
          legs[i].Arrival,
          legs[i].Departure,
          legs[i].OriginStation,
          legs[i].DestinationStation
        );
      }
    }
  };
  const classes = useStyles();
  return (
    <Grid container justify="center" style={{ padding: "20px" }}>
      <Paper
        key={index}
        style={{ textAlign: "center" }}
        className={classes.root}
      >
        {findLegs(flight.InboundLegId)}
      </Paper>
    </Grid>
  );
};

export default FlightListItem;
