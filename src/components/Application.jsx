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
  // the main state is controlled by the custom hook useApplicationData, instead of directly
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // use selectors to get lists of the appointments and interviewers for the current state.day
  const selectedDayAppointments = getAppointmentsForDay(state, state.day);
  const selectedDayInterviewers = getInterviewersForDay(state, state.day);
  // add one last appointment, so things display correctly, and the time at the bottom appears
  selectedDayAppointments.push({ time: "5pm", interview: null });

  // using a ternary operator so the const appointments works correctly
  const appointments = (!state.appointments) ?
    // if there's no appointments yet, show a loading message
    [(<Status key="empty" message="Loading appointments..." />)] :
    // make a list of appointments for drawing in the return, in the schedule
    selectedDayAppointments.map(appointment =>
      (<Appointment
        key={"appointment_" + appointment.id + "_" + appointment.time}
        interviewers={selectedDayInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        {...appointment}
      />)
    );

  // the main page, the daylist generates the days to click on, in the sidebar, and the schedule is populated with appointments above
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
