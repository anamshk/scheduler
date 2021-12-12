import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";



export default function Appointment(props) {

  // const getAppointmentString = (time) => {
  //   if (time) {
  //     return `Appointment at ${time}`
  //   } else {
  //     return `No Appointments`
  //   }
  // }


  return (
    <>
    <Header time={props.time}/> 
      { props.interview ? <Show />: <Empty/>}
      {/* <article className="appointment">{props.time}</article> */}
    </>
    
  )
};
