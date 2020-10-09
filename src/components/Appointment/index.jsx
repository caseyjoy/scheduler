import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";
import Status from "components/Appointment/Status.jsx";
import Confirm from "components/Appointment/Confirm.jsx";

// modes for transitioning between with useVisualMode
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = " ERROR_DELETE";

const REPLACE = true;

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    if (name && interviewer) {
      /* setStudent(name);
      setInterviewer(interviewer); */
      transition(SAVING, REPLACE);
      props.bookInterview(props.id, interview, () => {
        transition(SHOW);
      });
    }
  }

  function onDelete() {
    props.cancelInterview(
      props.id,
      () => {
        transition(DELETING, REPLACE);
      },
      () => {
        transition(EMPTY, REPLACE);
      }
    );
  }

  function onDeleteIconClick(name, interviewer) {
    transition(CONFIRM);
  }

  if (
    mode === SHOW &&
    (props.interview.student === "" || props.interview.interviewer === null)
  ) {
    transition(EMPTY, REPLACE);
  }

  let element;
  switch (mode) {
    case EDIT:
      element = (
        <Form name={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onSave={save} onCancel={back} />
      );
    break;

    case CREATE:
      element = (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      );
      break;

    case SAVING:
      element = <Status message="Saving interview..." />;
      break;
    case CONFIRM:
      element = (
        <Confirm
          onConfirm={() => {
            onDelete();
          }}
          onCancel={back}
          message="Really delete?"
        />
      );
      break;

    case DELETING:
      element = <Status message="Deleting interview..." />;
      break;

    case SHOW:
      element = (
        <Show
          onEditClick={()=>{ transition(EDIT, REPLACE); }}
          onDeleteIconClick={() => {
            onDeleteIconClick();
          }}
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
      break;

    default:
      element = (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      );
      break;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {element}
    </article>
  );
}
