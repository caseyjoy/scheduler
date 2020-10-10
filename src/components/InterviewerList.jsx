import React from "react";

import List from "components/List.jsx";

import InterviewerListItem from "./InterviewerListItem.jsx";
import "components/InterviewerList.scss";

// the original InterviewerList
/* export default function InterviewerList(props) {
  const formattedInterviewers = props.interviewers.map(interviewer => 
    <InterviewerListItem
      {...interviewer}
      key={"interviewer_"+interviewer.id}
      selected={props.selectedInterviewer === interviewer.id ? "selected" : undefined} 
      setItem={props.onChange}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{formattedInterviewers}</ul>
    </section>
  );
} */

// The version using generic List to create the list
// Shows a list of interviewers, and allows you to select one
// Used in the Form component of Appointment
export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        <List
          {...props}
          listItem={InterviewerListItem}
          type="InterviewerList"
          spread={true}
          compare="id"
        />
      </ul>
    </section>
  );
}
