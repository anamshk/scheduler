import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const getAppointmentString = (time) => {
    if (time) {
      return `Appointment at ${time}`
    } else {
      return `No Appointments`
    }
  }

  return (
    <article className="appointment">{getAppointmentString(props.time)}</article>
  )
};
