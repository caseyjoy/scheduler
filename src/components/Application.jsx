import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "components/Appointment/index.jsx";
import Status from "components/Appointment/Status.jsx";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: null,
    interviewers: null,
  });

  function setDay(day) {
    setState({ ...state, day: day });
  }

  function cancelInterview(id){

  }

  function bookInterview(id, interview, show) {
    //console.log("bookInterview", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


//console.log("axios put")
    axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(function (response) {
        //console.log("PUT RESPONSE", response)
        setState({ ...state, appointments: appointments });
        show();
      });
  }

  useEffect(() => {
    const first = axios.get("http://localhost:8001/api/days");
    const second = axios.get("http://localhost:8001/api/appointments");
    const third = axios.get("http://localhost:8001/api/interviewers");

    Promise.all([
      Promise.resolve(first),
      Promise.resolve(second),
      Promise.resolve(third),
    ]).then((all) => {
      //console.log("All:", all);
      const [first, second, third] = all;
      setState({
        ...state,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      });
    });
  }, []);

  let appointments = [];
  if (!state.appointments) {
    appointments.push(<Status key="empty" message="Loading appointments..." />);
  } else {
    const selectedDayAppointments = getAppointmentsForDay(state, state.day);
    const selectedDayInterviewers = getInterviewersForDay(state, state.day);

    for (const appointment of selectedDayAppointments) {
      //console.log("appointment", appointment);

      console.log("LOOP APPOINTMENT", appointment)

      appointments.push(
        <Appointment
          key={"appointment_" + appointment.id + "_" + appointment.time}
          interviewers={selectedDayInterviewers}
          bookInterview={bookInterview}
          {...appointment}
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
              <DayList days={state.days} day={state.day} setDay={setDay} />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </>
        }
      </section>

      <section className="schedule">
        {appointments}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
