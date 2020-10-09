import React from "react";

import DayListItem from "components/DayListItem.jsx";

// Used for showing the list of days in the sidebar. Generates an array of DaylistItem to display
export default function DayList(props) {
  const listOfDays = (props.days !== []) ?
    props.days.map((day) => (
      <DayListItem
        key={"day_" + day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    ))
    : [];

  return <ul>{listOfDays}</ul>;
}
