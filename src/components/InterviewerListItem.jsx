import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

// Shows a single interviewer, for InterviewerList
export default function InterviewerListItem(props) {
  const newClassName = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      id={props.id}
      className={newClassName}
      onClick={() => {
        props.onChange(props.id);
      }}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
}
