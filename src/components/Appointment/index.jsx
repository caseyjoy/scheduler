import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";
import Status from "components/Appointment/Status.jsx";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

const REPLACE = true;

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  /* const [student, setStudent] = useState(
    props.interview ? props.interview.student : ""
  );
  const [interviewer, setInterviewer] = useState(
    props.interview ? props.interviewers[props.interview.interviewer] : null
  ); */

  //console.log(props.interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    //console.log("SAVE", name, interviewer);
    if (name && interviewer) {
      /* setStudent(name);
      setInterviewer(interviewer); */
      transition(SAVING, REPLACE);
      props.bookInterview(props.id, interview, () => {
        transition(SHOW);
      });
    }
  }

  function cancel() {
    back();
  }

  function onDelete(name, interviewer) {
    console.log("delete 1");
    console.log("DeleteInterview", name, interviewer);
    if (name && interviewer) {
      console.log("delete is go");
      props.cancelInterview(props.id, () => {transition(DELETING, REPLACE);}, () => {transition(EMPTY, REPLACE);});
    }
  }

  if(mode === SHOW && (props.interview.student === "" || props.interview.interviewer === null)){
    transition(EMPTY, REPLACE);
  }
 
  let element;
  if (mode === CREATE) {
    element = (
      <Form interviewers={props.interviewers} onSave={save} onCancel={cancel} />
    );
  } else if (mode === SAVING) {
    element = <Status message="Saving interview..." />;
  } else if (mode === DELETING) {
    element = <Status message="Deleting interview..." />;
/*     if (props.interview.student == "" || props.interview.interviewer == null)
    transition(SHOW, REPLACE) */
  } else if (mode === SHOW) {

    // TODO: Add check for no results
    element = (
      <Show
        onDelete={onDelete}
        student={props.interview ? props.interview.student : ""}
        interviewer={
          props.interview
            ? props.interviewers.filter(
                (i) => i.id === props.interview.interviewer
              )[0]
            : null
        }
      />
    );
  }
  // interviewer={props.interview ? props.interviewers.filter(i => i === props.interview.interviewer.id) : null } />
  else {
    element = (
      <Empty
        onAdd={() => {
          transition(CREATE);
        }}
      />
    );
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {element}
    </article>
  );
}
// : {editing ? <Create interviewers={props.interviewers} /> : ""}
