// Why is monday showing the wrong spot count?

import React from "react";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "components/Appointment/index.jsx";
import Status from "components/Appointment/Status.jsx";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData.jsx";

export default function Application(props) {
  const { state, setDay, bookInterview,cancelInterview } = useApplicationData();
  
  let appointments = [];
  if (!state.appointments) {
    appointments.push(<Status key="empty" message="Loading appointments..." />);
  } else {
    const selectedDayAppointments = getAppointmentsForDay(state, state.day);
    const selectedDayInterviewers = getInterviewersForDay(state, state.day);

    selectedDayAppointments.push({time: "5pm", interview: null});

    for (const appointment of selectedDayAppointments) {
      appointments.push(
        <Appointment
          key={"appointment_" + appointment.id + "_" + appointment.time}
          interviewers={selectedDayInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
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
      </section>
    </main>
  );
}
