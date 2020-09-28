import React,  { useState } from "react";
// import classnames from "classnames";

import InterviewerListItem from "./InterviewerListItem.jsx";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const [selectedInterviewer, setSelectedInterviewer] = useState(props.interviewer);

  const formattedInterviewers = props.interviewers.map(interviewer => 
    <InterviewerListItem
      {...interviewer}
      key={"interviewer_"+interviewer.id}
      selected={selectedInterviewer === interviewer.id ? "selected" : undefined} 
      setSelectedInterviewer={setSelectedInterviewer}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{formattedInterviewers}</ul>
    </section>
  );
}
