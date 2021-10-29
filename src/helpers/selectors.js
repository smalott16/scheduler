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

