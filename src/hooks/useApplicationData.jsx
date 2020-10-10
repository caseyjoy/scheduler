import { useState, useEffect } from "react";
import axios from "axios";

// The hook that handles the central state, and functions that handle that state
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: null,
    interviewers: null,
  });

  // set the currently selected day in the interface, client side
  function setDay(day) {
    setState({ ...state, day: day });
  }

  // the function passed to appointments, to create a new appointment, send it to the server, and update the interface
  function bookInterview(id, interview) {
    // create an appointment, and then store it in a new copy of appointments so we can send it to the server and update the client
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // send the changed appointments data object to the server. This returns a promise to Appointment index.js's save function
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        // TODO: should only do this if it works
        // decrement the spots for the day since one is added, client side
        const days = [...state.days].map((day) => {
          if (state.day === day.name) {
            return { ...day, spots: day.spots - 1 };
          }

          return day;
        });

        setState({ ...state, appointments: appointments, days: days });
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  // similar to bookInterview, onyl we remove all the data and then send appointments back with an empty one
  function cancelInterview(id) {
    // create an empty appointment, and then store it in a new copy of appointments so we can use it to update the client
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // send a delete request to the server. This returns a promise to Appointment index.js's onDelete function
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        // increment the spots for the day since one is removed, client side
        const days = [...state.days].map((day) =>
          state.day === day.name ? { ...day, spots: day.spots + 1 } : day
        );
        setState({ ...state, appointments: appointments, days: days });
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  useEffect(() => {
    function getDays() {
      return axios.get("/api/days");
    }

    function getAppointments() {
      return axios.get("/api/appointments");
    }

    function getInterviewers() {
      return axios.get("/api/interviewers");
    }

    Promise.all([getDays(), getAppointments(), getInterviewers()])
      .then(function (results) {
        const [days, appointments, interviewers] = results;
        setState({
          ...state,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        });
      })
      .catch((error) => {
        // TODO: Add an error component for when loading fails
      });
  // TODO: Figure out why eslint really wants useEffect to have state in the update check array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
