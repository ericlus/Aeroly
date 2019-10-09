import React from "react";
import FlightListItem from "./FlightListItem.jsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center"
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const FlightList = ({
  liveResults,
  legs,
  carriers,
  places,
  error,
  changeView
}) => {
  const classes = useStyles();

  const handleClick = () => {
    changeView("HOME");
  };

  return (
    <div>
      <div>
        {liveResults.Status && !error ? (
          <div>
            {liveResults.Status === "UpdatesPending" ? (
              <Grid container justify="center">
                <CircularProgress className={classes.progress} />
              </Grid>
            ) : liveResults.Itineraries.length === 0 ? (
              <Grid container justify="center">
                <Grid item xs={12}>
                  No results found
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    className={classes.progress}
                    onClick={handleClick}
                  >
                    Return Back Home
                  </Button>
                </Grid>
              </Grid>
            ) : null}

            <Grid container justify="center">
              {liveResults.Itineraries.map((flight, i) => {
                return (
                  <FlightListItem
                    flight={flight}
                    index={i}
                    legs={legs}
                    carriers={carriers}
                    places={places}
                    style={{ textAlign: "center" }}
                  />
                );
              })}
            </Grid>
          </div>
        ) : null}

        {error ? (
          <div className={classes.root}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                Error in loading. Please try again.
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  className={classes.progress}
                  onClick={handleClick}
                >
                  Return Back Home
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FlightList;
