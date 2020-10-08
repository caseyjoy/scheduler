import React, {useState} from "react";


import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";

export default function Appointment(props) { 
  const [editing, setEditing] = useState(false);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }
  
  let element;
  if (editing){
    element = <Form interviewers={props.interviewers} onSave={save} />
  }
  else if (props.interview && !editing){
    element = <Show student={props.interview.student} interviewer={props.interviewers[props.interview.interviewer]} />
  }
  else {
   element = <Empty onAdd={setEditing} />
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* <Form save={save}/> */}
      {element}
    </article>
  )
}
// : {editing ? <Create interviewers={props.interviewers} /> : ""}
