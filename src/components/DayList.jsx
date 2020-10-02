import React from "react";

import DayListItem from "components/DayListItem.jsx";

/* function Test (){
  return (
    <h1>test</h1>
  )
} */

export default function DayList(props) {
  //  console.log("Props",props.days.map((day)=>{return 1}));
  let listOfDays = [];
  // TODO: Figure out why there's sometimes no list of days
  //if(props.days === undefined) alert("no props.days")

  console.log(props.days)

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
