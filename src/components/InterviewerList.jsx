import React from "react";

import InterviewerListItem from "./InterviewerListItem.jsx";
import "components/InterviewerList.scss";

// Shows a list of interviewers, and allows you to select one
// Used in the Form component of Appointment
export default function InterviewerList(props) {
  const formattedInterviewers = props.interviewers.map(interviewer => 
    <InterviewerListItem
      {...interviewer}
      key={"interviewer_"+interviewer.id}
      selected={props.selectedInterviewer === interviewer.id ? "selected" : undefined} 
      setInterviewer={props.setInterviewer}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{formattedInterviewers}</ul>
    </section>
  );
}
