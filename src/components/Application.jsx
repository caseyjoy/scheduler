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

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put("http://localhost:8001/api/days", appointment)
      .then(function (response) {
        setState({ ...state, appointments: appointments });
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
      console.log("appointment", appointment);

      appointments.push(
        <Appointment
          key={"appointment_" + appointment.id + "_" + appointment.time}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          interviewers={selectedDayInterviewers}
          bookInterview={bookInterview}
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
