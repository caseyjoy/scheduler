import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
import Form from "components/Appointment/Form.jsx";
import Status from "components/Appointment/Status.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import Error from "components/Appointment/Error.jsx";

import { getInterviewerForId } from "helpers/selectors.js";

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

// only really used for calling transition when replacing
const REPLACE = true;

// the main appointment component, swaps between displaying multiple subcomponents depending on mode
export default function Appointment(props) {
  // mode state is managed by custom hook useVisualMode, can only change mode with the functions it returns - transition and back
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY // if we didn't get an interview, the appointment must be EMPTY
  );

  // passed along for saving data
  function save(name, interviewer) {
    // a new interview needs to be made to be passed back up the chain to Application
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    if (name && interviewer) {
      transition(SAVING, REPLACE);
      props.bookInterview(
        props.id,
        interview,
        () => {
          transition(SHOW); // after saving the data, we can then show it
        },
        () => {
          transition(ERROR_SAVE); // if it broke, we need to be able to error out
        }
      );
    }
  }

  // passed along for deleting data
  function onDelete() {
    props.cancelInterview(
      props.id,
      () => {
        transition(DELETING, REPLACE);
      },
      () => {
        transition(EMPTY, REPLACE);
      },
      (response) => {
        transition(ERROR_DELETE); // if it broke, we need to be able to error out
      }
    );
  }

  function onDeleteIconClick(name, interviewer) {
    // When the trash bin icon is clicked, we need to show the confirmation component first
    transition(CONFIRM);
  }

  if (
    mode === SHOW &&
    (props.interview.student === "" || props.interview.interviewer === null)
  ) {
    // if we're showing an appointment, but the student and interviewer are both not set, go back to showing an empty appointment
    transition(EMPTY, REPLACE);
  }

  // the component that gets drawn after the header
  // depending on what mode is set, set the right coponent to element to be displayed
  // had to wrap switch in a function to get it to return right
  // TODO: Find out if there's a way to return things here without wrapping switch in in a function
  const element = (function () {
    switch (mode) {
      case EDIT:
        return (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        );

      case CREATE:
        return (
          <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
        );

      case SAVING:
        return (<Status message="Saving interview..." />);

      case CONFIRM:
        return (
          <Confirm
            onConfirm={() => {
              onDelete();
            }}
            onCancel={back}
            message="Really delete?"
          />
        );

      case DELETING:
        return (<Status message="Deleting interview..." />);

      case SHOW:
        return (
          <Show
            onEditClick={() => {
              transition(EDIT, REPLACE);
            }}
            onDeleteIconClick={() => {
              onDeleteIconClick();
            }}
            student={props.interview ? props.interview.student : ""}
            interviewer={getInterviewerForId(
              props.interviewers,
              props.interview.interviewer
            )
            }
          />
        );

      case ERROR_SAVE:
        return (
          <Error message="Error saving appointment." onClose={back} />
        );

      case ERROR_DELETE:
        return (
          <Error message="Error deleting appointment." onClose={back} />
        );

      // otherwise, it's just empty
      default:
        return (
          <Empty
            onAdd={() => {
              transition(CREATE);
            }}
          />
        );
    }
  })();

  console.log("what is element:", element, typeof (element))

  // show the time header, and the component element we picked above
  return (
    <article className="appointment">
      <Header time={props.time} />
      {element}
    </article>
  );
}
