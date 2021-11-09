//This hook handles setting state for the broad scale of the app
//It also handles side effects such as network requests

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationDefault() {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => setState({...state, day});
  const setDays = (days) => setState(prev => ({...prev, days}));
  
  //retrieve database information and update state to reflect db contents
  useEffect(() => {
    
    const daysPromise = axios.get(`/api/days`);
    const appointmentsPromise = axios.get(`/api/appointments`);
    const interviewersPromise = axios.get(`/api/interviewers`);
    
    Promise.all([
      daysPromise,
      appointmentsPromise,
      interviewersPromise,
    ])
    .then((responses) => {
      //set the overall application state based on the database contents on initial load/refresh
      setState((prev) => {
        return {...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data} 
      })  
    })
    .catch((err) => {
      console.log(err.message);
    }); 
  
  }, []);

  //function called each time an intervirw is added or deleted to determine the # available time slots
  const calculateSpots = (appointments) => {
    let spots = 0;
    let newDay = {id: null, name: null, appointments: [], interviewers: [], spots: null}
    
    for (let currentDay of state.days) {
      if (currentDay.name === state.day) {
        currentDay.appointments.map((appointmentID) => {
          
          if (!appointments[appointmentID].interview) {
            return spots++;
          }

        });

        newDay = {...currentDay, spots};

      }
    }
    const newDays = state.days.map(d => d.name === state.day? newDay : d);
    return newDays;
  };
  
  //called as part of the booking process - add intervirew info to db, update state to reflect update
  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, {...appointment})
    .then(() => {
      setState((prev) => ({
        ...prev,
        appointments
      }));
      setDays(calculateSpots(appointments));
    });

  };
  
  //called as part of the delete interview process - update database, set state
  const cancelInterview = (id) => {
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {

      const appointment = {
        ...state.appointments[id], 
        interview: null
      };
  
      const appointments = {
        ...state.appointments, 
        [id]: appointment
      };
  
      setState((prev) => ({
        ...prev,
        appointments
      }));

      setDays(calculateSpots(appointments));
    });
  
  }
  
  return { state, setDay, bookInterview, cancelInterview };
};
