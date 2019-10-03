import React, { Component } from "react";
import Search from "./Search.jsx";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fromDestination: "",
      toDestination: "",
      departDate: moment(new Date()).format("YYYY-MM-DD"),
      returnDate: moment(new Date())
        .add("days", 7)
        .format("YYYY-MM-DD"),
      cabin: "economy",
      adults: 1,
      view: "HOME"
    };
    this.changeFromDestination = this.changeFromDestination.bind(this);
    this.changeToDestination = this.changeToDestination.bind(this);
    this.changeDepartDate = this.changeDepartDate.bind(this);
    this.changeReturnDate = this.changeReturnDate.bind(this);
    this.searchFlight = this.searchFlight.bind(this);
    this.changeCabin = this.changeCabin.bind(this);
    this.changeAdults = this.changeAdults.bind(this);
  }

  changeFromDestination(destination) {
    this.setState({ fromDestination: destination });
  }

  changeToDestination(destination) {
    this.setState({ toDestination: destination });
  }

  changeDepartDate(date) {
    this.setState({ departDate: date });
  }

  changeReturnDate(date) {
    this.setState({ returnDate: date });
  }

  changeCabin(cabin) {
    this.setState({ cabin: cabin });
  }

  changeAdults(number) {
    this.setState({ adults: number });
  }

  searchFlight() {
    this.setState({ view: "SEARCHED" });
  }

  render() {
    return (
      <div>
        <h1>Aeroly</h1>
        {this.state.view === "HOME" ? (
          <Search
            changeFromDestination={this.changeFromDestination}
            changeToDestination={this.changeToDestination}
            changeDepartDate={this.changeDepartDate}
            changeReturnDate={this.changeReturnDate}
            searchFlight={this.searchFlight}
            changeCabin={this.changeCabin}
            changeAdults={this.changeAdults}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
