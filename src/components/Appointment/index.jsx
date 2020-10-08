import React, {useState} from "react";


import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Create from "components/Appointment/Create.jsx";
//import  from "components/Appointment/.jsx";
//

export default function Appointment(props) { 
  const [editing, setEditing] = useState(false);


  return (
    <article className="appointment">
      <Header time={props.time} />
      {(props.interview && !editing) ? <Show student={props.interview.student} interviewer={props.interviewers[props.interview.interviewer]} /> : <Empty onClick={setEditing} />}
      
    </article>
  )
}
// : {editing ? <Create interviewers={props.interviewers} /> : ""}
