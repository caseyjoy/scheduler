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
    // create an appointment, and then store it in a new copy of appointments so we can send it to the server
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // send the changed appointments data object to the server
    axios.put(`/api/appointments/${id}`, appointment).then(function (response) {
      // TODO: should only do this if it works
      // decrement the spots for the day since one is added, client side
      const days = [...state.days].map((day) => {
        if (state.day === day.name) {
          return { ...day, spots: day.spots - 1 };
        }

        return day;
      });

      setState({ ...state, appointments: appointments, days: days });
    }).catch(function (error){
/*    console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.data); */
      return error;
      //return Promise.reject(error);
    });
  }

  // similar to bookInterview, onyl we remove all the data and then send appointments back with an empty one
  function cancelInterview(id) {
    // create an empty appointment, and then store it in a new copy of appointments so we can send it to the server
    const appointment = {
      ...state.appointments[id],
      interview: { student: "", interviewer: null },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios.put(`/api/appointments/${id}`, appointment).then(function (response) {
      // TODO: should only do this if it works
      // increment the spots for the day since one is removed, client side
      const days = [...state.days].map((day) => {
        if (state.day === day.name) {
          return { ...day, spots: day.spots + 1 };
        }

        return day;
      })

      setState({ ...state, appointments: appointments, days: days });
    }).catch(function (error){
      return error;
    });
  }

  // This is probably the wrong way to do this
  useEffect(() => {
    const first = axios.get("/api/days");
    const second = axios.get("/api/appointments");
    const third = axios.get("/api/interviewers");

    Promise.all([
      Promise.resolve(first),
      Promise.resolve(second),
      Promise.resolve(third),
    ]).then((all) => {
      const [first, second, third] = all;
      setState({
        ...state,
        days: first.data,
        appointments: second.data,
        interviewers: third.data,
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
