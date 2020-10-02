import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";


export default function InterviewerListItem (props){
  const newClassName = classnames(
    "interviewers__item",
    {"interviewers__item--selected": props.selected}
  )

  return (
  <li id={props.id} 
      className={newClassName}
      onClick={()=>{props.setInterviewer(props.id)}}
      selected={props.selected}
      >
    <img
     className="interviewers__item-image"
     src={props.avatar}
      alt={props.name}
    />
      {props.selected ? props.name : ""}
 </li>
)

}