import React, { useState } from "react";

import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx";



export default function Create (props) {
  const [name, setName] = useState(props.name || "");
  const [selectedInterviewer, setInterviewer]  = useState(props.interviewer || null);

  function reset (){
    setName("");
    setInterviewer(null);
  }

  function cancel (){
    reset();
    props.onCancel();
  }

  function update(event){
    event.preventDefault();
    setName(event.target.value);
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
          <Button danger onClick={cancel}>
            Cancel
          </Button>

          <Button confirm onClick={props.onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

////
