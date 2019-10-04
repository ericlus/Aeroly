import React, { useState } from "react";

const FlightListItem = ({ flight, index, agents }) => {
  const findAgent = agentNumber => {
    for (let i = 0; i < agents.length; i++) {
      if (agents[i].Id === agentNumber) {
        return (
          <div>
            <img src={agents[i].ImageUrl} />
          </div>
        );
      }
    }
  };

  return (
    <div key={index}>
      {findAgent(flight.PricingOptions[0].Agents[0])}
      <h3>{flight.PricingOptions[0].Price}</h3>
    </div>
  );
};

export default FlightListItem;
