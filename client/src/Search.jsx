import React, { useState, useEffect } from "react";
import axios from "axios";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowNew: false,
      isLoading: false,
      options: [],
      from: "",
      to: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
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
    this.setState({ from: input[0].PlaceId });
  }

  handleToChange(input) {
    this.setState({ to: input[0].PlaceId });
  }

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
      </div>
    );
  }
}

export default Search;
