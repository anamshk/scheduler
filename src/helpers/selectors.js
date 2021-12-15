
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


export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  const obj = {};
  obj.student = interview.student;
  const interviewer = state.interviewers[interview.interviewer]
  obj.interviewer = interviewer
  return obj;
}