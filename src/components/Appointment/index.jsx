import React, {useState} from "react";


import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Empty from "components/Appointment/Empty.jsx";
//import  from "components/Appointment/.jsx";

export default function Appointment(props) {
  //const [name, setName] = useState(props.student || "");
  //const [interviewer, setInterviewer] = useState(props.interviewer || null);

return (
<article className="appointment">
  <Header time={props.time}/>

  {props.interview ? <Show name={props.student}/> : <Empty />}  
</article>
)
}
