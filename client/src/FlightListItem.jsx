import React, { useState } from "react";

const FlightListItem = ({ flight, index, agents, legs, carriers }) => {
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

  const findCarrier = carrierId => {
    for (let i = 0; i < carriers.length; i++) {
      if (carriers[i].Id === carrierId) {
        return (
          <div>
            <img src={carriers[i].ImageUrl} />
          </div>
        );
      }
    }
  };

  const findLegs = legId => {
    for (let i = 0; i < legs.length; i++) {
      if (legs[i].Id === legId) {
        return findCarrier(legs[i].Carriers[0]);
      }
    }
  };

  return (
    <div key={index}>
      {findAgent(flight.PricingOptions[0].Agents[0])}
      {findLegs(flight.InboundLegId)}
      <h3>{flight.PricingOptions[0].Price}</h3>
    </div>
  );
};

export default FlightListItem;
