import React from "react";

// The component shown in Appointment when there's no interview data to display
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button" 
        src="images/add.png" 
        alt="Add" />
    </main>
  );
}