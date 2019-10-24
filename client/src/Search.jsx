import React, { useState } from "react";
import axios from "axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import {
  Grid,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";

const Search = ({
  changeFromDestination,
  changeToDestination,
  changeDepartDate,
  changeReturnDate,
  searchFlight,
  changeCabin,
  changeAdults
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(
    moment(new Date())
      .add("days", 7)
      .format("MM-DD-YYYY")
  );
  const [cabin, setCabin] = useState("economy");
  const [adults, setAdults] = useState(1);

  const handleSearch = query => {
    setIsLoading(true);
    axios
      .get("/list/places", { params: { word: query } })
      .then(result => {
        setIsLoading(false);
        setOptions(result.data.Places);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFromChange = input => {
    if (input[0]) {
      changeFromDestination(input[0].PlaceId);
    }
  };

  const handleToChange = input => {
    if (input[0]) {
      changeToDestination(input[0].PlaceId);
    }
  };

  const handleDepartDateChange = (date, dateFormatted) => {
    setDepartDate(dateFormatted);
    let departFormatted = moment(dateFormatted).format("YYYY-MM-DD");
    changeDepartDate(departFormatted);
  };

  const handleReturnDateChange = (date, dateFormatted) => {
    setReturnDate(dateFormatted);
    let returnFormatted = moment(dateFormatted).format("YYYY-MM-DD");
    changeReturnDate(returnFormatted);
  };

  const handleClick = () => {
    searchFlight();
  };

  const handleSelectChange = e => {
    setCabin(e.target.value);
    changeCabin(e.target.value);
  };

  const handleAdultsChange = e => {
    setAdults(e.target.value);
    changeAdults(e.target.value);
  };

  const numAdults = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <Grid container justify="center">
        <div style={{ width: "500px", padding: "10px" }}>
          <AsyncTypeahead
            isLoading={isLoading}
            options={options}
            useCache={false}
            id="location"
            labelKey="PlaceName"
            filterBy={(option, prop) => {
              return option;
            }}
            minLength={3}
            onSearch={handleSearch}
            placeholder="Search for a departure location"
            onChange={handleFromChange}
          />
        </div>

        <div style={{ width: "500px", padding: "10px" }}>
          <AsyncTypeahead
            isLoading={isLoading}
            options={options}
            useCache={false}
            id="location"
            labelKey="PlaceName"
            filterBy={(option, prop) => {
              return option;
            }}
            minLength={3}
            onSearch={handleSearch}
            placeholder="Search for a destination"
            onChange={handleToChange}
          />
        </div>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Depart"
              value={departDate}
              onChange={handleDepartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Return"
              value={returnDate}
              onChange={handleReturnDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item style={{ marginTop: "7px" }}>
          <FormControl>
            <InputLabel htmlFor="age-simple">Cabin</InputLabel>
            <Select
              value={cabin}
              onChange={handleSelectChange}
              inputProps={{
                name: "Cabin"
              }}
            >
              <MenuItem value={"economy"}>Economy</MenuItem>
              <MenuItem value={"premiumeconomy"}>Premium Economy</MenuItem>
              <MenuItem value={"business"}>Business</MenuItem>
              <MenuItem value={"first"}>First</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ marginTop: "7px" }}>
          <FormControl>
            <InputLabel htmlFor="age-simple">Adults</InputLabel>
            <Select
              value={adults}
              onChange={handleAdultsChange}
              inputProps={{
                name: "Adults"
              }}
            >
              {numAdults.map(item => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justify="center" style={{ padding: "20px" }}>
        <Button variant="outlined" onClick={handleClick}>
          Search Flights
        </Button>
      </Grid>
    </div>
  );
};

export default Search;
