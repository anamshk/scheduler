import Appointment from "components/Appointment";
import DayList from "components/DayList";
import React from "react";

export function getAppointmentsForDay(state, day) {
  const arr = [];
  for (let d of state.days) {
    if (day === d.name) {
      for (let id of d.appointments) {
        for (let appt in state.appointments) {
          if (id === state.appointments[appt].id) {
            arr.push(state.appointments[appt]);
          }
        }
      }
    }
  }
  return arr;
}