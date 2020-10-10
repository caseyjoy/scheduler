import React from "react";

import List from "components/List.jsx";
import DayListItem from "components/DayListItem.jsx";

// The original DayList
/* export default function DayList(props) {
  const listOfDays = (props.days !== []) ?
    props.days.map((day) => (
      <DayListItem
        key={"day_" + day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setItem={props.setItem}
      />
    ))
    : [];

  return <ul>{listOfDays}</ul>;
} */

// The version using generic List to create the list
// Used for showing the list of days in the sidebar. Generates an array of DaylistItem to display
export default function DayList(props) {
  return (
    <ul>
      <List
        {...props}
        type="DayList"
        listItem={DayListItem}
        compare="name"
      />
    </ul>
  );
}
