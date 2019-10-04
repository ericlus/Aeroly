import React from "react";
import ListItem from "@material-ui/core/ListItem";
import moment from "moment";

const FlightListItem = ({ flight, index, agents, legs, carriers }) => {
  //   const findAgent = agentNumber => {
  //     for (let i = 0; i < agents.length; i++) {
  //       if (agents[i].Id === agentNumber) {
  //         return (
  //           <div>
  //             <img src={agents[i].ImageUrl} />
  //           </div>
  //         );
  //       }
  //     }
  //   };

  const findCarrier = (carrierId, arrival, departure) => {
    const splitArrival = arrival.split("T");
    const splitDeparture = departure.split("T");
    const formatArrival = moment(splitArrival[1], "HH:mm").format("hh:mm a");
    const formatDeparture = moment(splitDeparture[1], "HH:mm").format(
      "hh:mm a"
    );
    for (let i = 0; i < carriers.length; i++) {
      if (carriers[i].Id === carrierId) {
        return (
          <div>
            <div>Departure: {formatDeparture}</div>
            <div>Arrival: {formatArrival}</div>
            <img src={carriers[i].ImageUrl} />
          </div>
        );
      }
    }
  };

  const findLegs = legId => {
    for (let i = 0; i < legs.length; i++) {
      if (legs[i].Id === legId) {
        return findCarrier(
          legs[i].Carriers[0],
          legs[i].Arrival,
          legs[i].Departure
        );
      }
    }
  };

  return (
    <a href={flight.PricingOptions[0].DeeplinkUrl}>
      <ListItem key={index}>
        {/* {findAgent(flight.PricingOptions[0].Agents[0])} */}
        {findLegs(flight.InboundLegId)}
        <h3>${flight.PricingOptions[0].Price}</h3>
      </ListItem>
    </a>
  );
};

export default FlightListItem;
