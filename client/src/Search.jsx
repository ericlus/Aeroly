import React from "react";
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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      options: [],
      departDate: new Date(),
      returnDate: moment(new Date())
        .add("days", 7)
        .format("MM-DD-YYYY")
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleDepartDateChange = this.handleDepartDateChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
  }

  handleSearch(query) {
    this.setState({ isLoading: true });
    axios
      .get("/list/places", { params: { word: query } })
      .then(result => {
        this.setState({ isLoading: false, options: result.data.Places });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFromChange(input) {
    this.props.changeFromDestination(input[0].PlaceId);
  }

  handleToChange(input) {
    this.props.changeToDestination(input[0].PlaceId);
  }

  handleDepartDateChange(date, dateFormatted) {
    this.setState({ departDate: dateFormatted });
    let departFormatted = moment(dateFormatted).format("YYYY-MM-DD");
    this.props.changeDepartDate(departFormatted);
  }

  handleReturnDateChange(date, dateFormatted) {
    this.setState({ returnDate: dateFormatted });
    let returnFormatted = moment(dateFormatted).format("YYYY-MM-DD");
    this.props.changeReturnDate(returnFormatted);
  }

  handleClick() {}

  render() {
    return (
      <div>
        <AsyncTypeahead
          {...this.state}
          id="location"
          labelKey="PlaceName"
          filterBy={(option, prop) => {
            return option;
          }}
          minLength={3}
          onSearch={this.handleSearch}
          placeholder="Search for a location"
          onChange={this.handleFromChange}
        />
        <AsyncTypeahead
          {...this.state}
          id="location"
          labelKey="PlaceName"
          filterBy={(option, prop) => {
            return option;
          }}
          minLength={3}
          onSearch={this.handleSearch}
          placeholder="Search for a location"
          onChange={this.handleToChange}
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
              value={this.state.departDate}
              onChange={this.handleDepartDateChange}
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
              value={this.state.returnDate}
              onChange={this.handleReturnDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Button variant="outlined" onClick={this.handleClick}>
          Search Flights
        </Button>
      </div>
    );
  }
}

export default Search;
