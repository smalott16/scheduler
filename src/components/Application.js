import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"; //auto assumes its index.js
import axios from 'axios'
import { getAppointmentsForDay } from "../helpers/selectors";


export default function Application() {
  
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = (day) => setState({...state, day});
  const setDays = (days) => setState(prev => ({...prev, days}));
  
  useEffect(() => {
    
    const baseURL = `http://localhost:8001`
    const daysPromise = axios.get(`${baseURL}/api/days`);
    const appointmentsPromise = axios.get(`${baseURL}/api/appointments`);
    const interviewersPromise = axios.get(`${baseURL}/api/interviewers`);
    
    Promise.all([
      daysPromise,
      appointmentsPromise,
      interviewersPromise,
    ])
    .then((responses) => {
      setState((prev) => {
        return {...prev, days: responses[0].data, appointments: responses[1].data} 
      })  
    })
    .catch((err) => {
      console.log(err.message);
    })   
  }, []);
  
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentArray = dailyAppointments.map((appointment) => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
      />
    )
  })

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

}
