export function getAppointmentsForDay(state, day) {
  const arr = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      item.appointments.forEach((appt) => {
        arr.push(state.appointments[appt]);
      });
    }
  });

  return arr;
}


export function getInterviewersForDay(state, day) {
  const interviewerArr = [];

  if (state.days.length === 0){
    return [];
  }

	state.days.forEach((item) => {
		if (item.name === day) {
			item.interviewers.forEach((int) => {
				if (int.id === state.interviewers.id) {
					interviewerArr.push(state.interviewers[int]);
				}
			});
		}
	});

	return interviewerArr;
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

