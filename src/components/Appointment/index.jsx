import React, {useState} from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";


const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) { 
  const { mode, transition } = useVisualMode(props.interview ? SHOW : EMPTY);
  const [student, setStudent] = useState(props.interview ? props.interview.student : "");
  const [interviewer, setInterviewer] = useState(props.interview ? props.interviewers[props.interview.interviewer] : null)

  console.log(props.interview)

  function save(name, interviewer) {
  /*     const interview = {
      student: name,
      interviewer
    }; */
    console.log(name, interviewer)
    setStudent(name)
    setInterviewer(interviewer)
    transition("SHOW");
  }
  
  let element;
  if (mode === "FORM"){
    element = <Form interviewers={props.interviewers} onSave={save} />
  }
  else if (mode==="SHOW"){
    //props.interview.student
    element = <Show student={student} interviewer={props.interviewers[interviewer]} />
  }
  else {
   element = <Empty onAdd={()=>{transition("FORM")}} />
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {element}
    </article>
  )
}
// : {editing ? <Create interviewers={props.interviewers} /> : ""}
