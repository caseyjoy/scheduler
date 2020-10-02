import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "components/Appointment/index.jsx";
import Status from "components/Appointment/Status.jsx";
import getAppointmentsForDay from "helpers/selectors.jsx";

/* const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
]; */

/* function setDay (day){
  console.log(day);
} */

export default function Application(props) {
  const [state, setState] = useState({
    day: "monday",
    days: [],
    appointments: null,
  });
  /*  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]); */

  useEffect(() => {
    const first = axios.get("http://localhost:8001/api/days");
    const second = axios.get("http://localhost:8001/api/appointments");

    Promise.all([Promise.resolve(first), Promise.resolve(second)]).then(
      (all) => {
        console.log("All:", all);
        const [first, second] = all;
        setState({ days: first.data, appointments: second.data });
      }
    );
  }, []);

  let appointments = [];
  if (!state.appointments) {
    appointments.push(<Status key="empty" message="Loading appointments..." />);
  } else {
    for (let a in state.appointments) {
      const tempAppointment = state.appointments[a]; 
      console.log("appointment:",tempAppointment)
      appointments.push(
        <Appointment
          key={"appointment" + "_" + tempAppointment.id + "_" + tempAppointment.time}
          id={tempAppointment.id}
          time={tempAppointment.time}
          interview={tempAppointment.interview}
        />
      );
    }
  }

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList
                days={state.days}
                day={state.day}
                setDay={(e) => {
                  setState({ ...state, day: e });
                }}
              />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
      </section>

      <section className="">
        {appointments}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}

/*

<section>
        <InterviewerList interviewers={interviewers} />
      </section>

*/
