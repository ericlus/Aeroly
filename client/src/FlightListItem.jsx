import React from "react";

const FlightListItem = ({ flight, index }) => {
  return (
    <div key={index}>
      <h3>{flight.PricingOptions[0].Price}</h3>
    </div>
  );
};

export default FlightListItem;
