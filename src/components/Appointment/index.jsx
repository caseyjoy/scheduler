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
const ERROR_DELETE = "ERROR_DELETE";
const FORGOT = "FORGOT";

// only really used for calling transition when replacing, to make it more obvious what it's doing
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
      props
        .bookInterview(props.id, interview)
        .then(
          // calling these with then and catch instead of passing them directly, to avoid stale state
          (response) => {
            console.log("What's doing this", response);
            transition(SHOW); // after saving the data, we can then show it
          }
        )
        .catch((error) => {
          transition(ERROR_SAVE); // if it broke, it needs to error out
        });
    } else {
      transition(FORGOT);
    }
  }

  // passed along for deleting data
  function onDelete() {
    transition(DELETING, REPLACE);
    props
      .cancelInterview(props.id)
      .then((response) => {
        transition(EMPTY, REPLACE);
      })
      .catch((error) => {
        transition(ERROR_DELETE, REPLACE); // if it broke, we need to be able to error out
      });
  }

  function onDeleteIconClick(name, interviewer) {
    // When the trash bin icon is clicked, we need to show the confirmation component first
    transition(CONFIRM);
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
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        );

      case SAVING:
        return <Status message="Saving interview..." />;

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
        return <Status message="Deleting interview..." />;

      case SHOW:
        if (props.interview) {
          return (
            <Show
              onEditClick={() => {
                transition(EDIT);
              }}
              onDeleteIconClick={() => {
                onDeleteIconClick();
              }}
              student={props.interview ? props.interview.student : ""}
              interviewer={getInterviewerForId(
                props.interviewers,
                props.interview.interviewer
              )}
            />
          );
        }

      case ERROR_SAVE:
        return <Error message="Error saving appointment." onClose={back} />;

      case ERROR_DELETE:
        return <Error message="Error deleting appointment." onClose={back} />;

      case FORGOT:
        return (
          <Error
            message="Please enter a student name and select an interviewer before saving."
            onClose={back}
          />
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

  // show the time header, and the component element we picked above
  return (
    <article className="appointment">
      <Header time={props.time} />
      {element}
    </article>
  );
}
