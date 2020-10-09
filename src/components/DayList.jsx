import React from "react";

import DayListItem from "components/DayListItem.jsx";

export default function DayList(props) {
  let listOfDays = [];

  if (props.days !== []){
  listOfDays = props.days.map((day) => (
    <DayListItem
      key={"day_"+day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
  }

  return <ul>{listOfDays}</ul>;
}
