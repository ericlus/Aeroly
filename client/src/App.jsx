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
        .format("YYYY-MM-DD")
    };
    this.changeFromDestination = this.changeFromDestination.bind(this);
    this.changeToDestination = this.changeToDestination.bind(this);
    this.changeDepartDate = this.changeDepartDate.bind(this);
    this.changeReturnDate = this.changeReturnDate.bind(this);
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

  render() {
    return (
      <div>
        <h1>Aeroly</h1>
        <Search
          changeFromDestination={this.changeFromDestination}
          changeToDestination={this.changeToDestination}
          changeDepartDate={this.changeDepartDate}
          changeReturnDate={this.changeReturnDate}
        />
      </div>
    );
  }
}

export default App;
