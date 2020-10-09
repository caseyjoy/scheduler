import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";
import Status from "components/Appointment/Status.jsx";
import Confirm from "components/Appointment/Confirm.jsx";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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
  if (mode === CREATE) {
    element = (
      <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
    );
  } else if (mode === SAVING) {
    element = <Status message="Saving interview..." />;
  } else if (mode === CONFIRM) {
    element = (
      <Confirm
        onConfirm={() => {
          onDelete();
        }}
        onCancel={back}
        message="Really delete?"
      />
    );
  } else if (mode === DELETING) {
    element = <Status message="Deleting interview..." />;
    /*     if (props.interview.student == "" || props.interview.interviewer == null)
    transition(SHOW, REPLACE) */
  } else if (mode === SHOW) {
    // TODO: Add check for no results
    element = (
      <Show
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
