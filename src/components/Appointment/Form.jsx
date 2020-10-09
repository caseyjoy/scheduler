import React, { useState } from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx";

// shown when editing an appointment, or making a new one
export default function Form (props) {
  const [name, setName] = useState(props.name || "");
  const [selectedInterviewer, setInterviewer]  = useState(props.interviewer || null);

  // when typing in the student name field, it calls this
  function update(event){
    event.preventDefault();
    setName(event.target.value);
  }

  // when clicking the save button, call the onSave function to change the mode and save the data
  function save(event){
    props.onSave(name, selectedInterviewer);
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            onChange={update}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name} // This must be a controlled component
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={selectedInterviewer}
          selectedInterviewer={selectedInterviewer}
          setInterviewer={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>
            Cancel
          </Button>

          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

////
