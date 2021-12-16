import axios from "axios";
import { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import DayList from "components/DayList";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all[0]);
      console.log(all[1]);
      console.log(all[2]);
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data 
      }));
    });
  }, []);

  function updateSpots(id, days, value) {
   for (let day of days) {
     if(day.appointments.includes(id)) {
       day.spots = day.spots + value
     }
   }
  }


  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        updateSpots(id, state.days, -1)
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        updateSpots(id, state.days, +1)
        setState({ ...state, appointments });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return ({ state, setState, setDay, dailyAppointments, bookInterview, cancelInterview});
}