import React from "react";
import useApplicationData from 'hooks/useApplicationData';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"; //auto assumes its index.js

import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors";


export default function Application() {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let dailyInterviewers = getInterviewersForDay(state, state.day);
  const appointmentArray = dailyAppointments.map((appointment) => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interviewers={dailyInterviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );

};
