import React from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const FlightListItem = ({ flight, index, agents, legs, carriers }) => {
  //   const findAgent = agentNumber => {
  //     for (let i = 0; i < agents.length; i++) {
  //       if (agents[i].Id === agentNumber) {
  //         return (
  //           <div>
  //             <img src={agents[i].ImageUrl} />
  //           </div>
  //         );
  //       }
  //     }
  //   };

  const findCarrier = (carrierId, arrival, departure) => {
    const splitArrival = arrival.split("T");
    const splitDeparture = departure.split("T");
    const formatArrival = moment(splitArrival[1], "HH:mm").format("hh:mm a");
    const formatDeparture = moment(splitDeparture[1], "HH:mm").format(
      "hh:mm a"
    );
    for (let i = 0; i < carriers.length; i++) {
      if (carriers[i].Id === carrierId) {
        return (
          //   <div>
          <Grid container justify="center">
            <Grid item xs={4}>
              <img src={carriers[i].ImageUrl} />
            </Grid>
            <Grid item xs={4}>
              <h3>${flight.PricingOptions[0].Price}</h3>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined">Select</Button>
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
          </Grid>
          //   </div>
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
          legs[i].Departure
        );
      }
    }
  };
  const classes = useStyles();
  return (
    // <a
    //   href={flight.PricingOptions[0].DeeplinkUrl}
    //   style={{ textAlign: "center" }}
    // >
    // <Grid item xs={12}>
    <Grid container justify="center" style={{ padding: "20px" }}>
      <Paper
        key={index}
        style={{ textAlign: "center" }}
        className={classes.root}
      >
        {findLegs(flight.InboundLegId)}
      </Paper>
    </Grid>
    // {/* </a> */}
  );
};

export default FlightListItem;
