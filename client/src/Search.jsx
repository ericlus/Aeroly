import React, { useState } from "react";
import axios from "axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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
    this.setState({ adults: e.target.value });
    setAdults(e.target.value);
    changeAdults(e.target.value);
  };

  const numAdults = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
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
        placeholder="Search for a location"
        onChange={handleFromChange}
      />
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
        placeholder="Search for a location"
        onChange={handleToChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
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
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
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
        </Grid>
      </MuiPickersUtilsProvider>

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

      <Button variant="outlined" onClick={handleClick}>
        Search Flights
      </Button>
    </div>
  );
};

export default Search;
