import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: null,
    interviewers: null,
  });

  function setDay(day) {
    setState({ ...state, day: day });
  }

  function bookInterview(id, interview, show) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = {
      ...state.days
    }

    // send the changed appointment data to the server
    axios
      .put(`/api/appointments/${id}`, appointment)
      .then(function (response) {
        setState({ ...state, appointments: appointments });
        show();
      });
      /* .catch(function (error){
        return Promise.reject(error);
      }); */

      // change the day data to the server
      /* setState({ ...state, days: days }); */

  }

  function cancelInterview(id, status, empty){
    const appointment = {
     ...state.appointments[id],
     interview: { student: "", interviewer: null },
   }; 
   
   const appointments = {
     ...state.appointments,
     [id]: appointment,
   };

   setState({ ...state, appointments: appointments });
   status();

     axios
     .put(`/api/appointments/${id}`, appointment)
     .then(function (response) {
       setState({ ...state, appointments: appointments });
       empty();
     });
/*       .catch(function (error){
       return Promise.reject(error);
     }); */

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

  return { state, setDay, bookInterview,cancelInterview };
}