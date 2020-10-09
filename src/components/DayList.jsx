import React from "react";

import DayListItem from "components/DayListItem.jsx";

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
