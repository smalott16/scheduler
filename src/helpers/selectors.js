export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = []
  //loop through the days
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      eachDay.appointments.map((appointmentID) => {
        return appointmentsForDay.push(state.appointments[appointmentID])
      })
    }
  }
  return appointmentsForDay;
};

export function getInterviewersForDay(state, day) {
  const interviewersForDay = []
  //loop through the days
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      eachDay.interviewers.map((interviewerID) => {
        return interviewersForDay.push(state.interviewers[interviewerID])
      })
    }
  }
  return interviewersForDay;
};

export function getInterview(state, interview) {
  const interviewSummary ={}
  if(interview) {
    interviewSummary.student = interview.student;
    interviewSummary.interviewer = state.interviewers[interview.interviewer];
    return interviewSummary
  }
  return null;
};
