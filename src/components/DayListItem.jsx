import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

function formatSpots(spots) {
  spots = Number(spots)

  switch (spots) {
    case 0:
      return "no spots remaining";
    case 1:
      return "1 spot remaining";
    default:
      return spots+" spots remaining";
  }
}

// Displays a day, only used in DayList
export default function DayListItem(props) {
  const spots = Number(props.spots)
  const formattedSpots = formatSpots(spots);

  const classes = classnames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": spots === 0 }
  );

  return (
     <li className={classes} onClick={() => props.onChange(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formattedSpots}</h3>
    </li> 

  );
}
