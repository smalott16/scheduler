import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useApplicationDefault() {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => setState({...state, day});
  const setDays = (days) => setState(prev => ({...prev, days}));
  
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
      setState((prev) => {
        return {...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data} 
      })  
    })
    .catch((err) => {
      console.log(err.message);
    }) 
  
  }, []);

  const calculateSpots = (appointments) => {
    let spots = 0;
    let newDay = {id: null, name: null, appointments: [], interviewers: [], spots: null}
    console.log("passed", appointments)
    console.log("state", state.appointments)
    for (let currentDay of state.days) {
      if (currentDay.name === state.day) {
        console.log("currentDay", currentDay);
        currentDay.appointments.map((appointmentID) => {
          
          if (!appointments[appointmentID].interview) {
            console.log("count +")
            spots++;
          }

        });
        newDay = {...currentDay, spots}
        console.log("newDay", newDay)
      }

    }
    const newDays = state.days.map(d => d.name === state.day? newDay : d)
    console.log(newDays);
    return newDays;
  };
  
  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    setState((prev) => ({
      ...prev,
      appointments
    }));
  
    return axios.put(`/api/appointments/${id}`, {...appointment})
      .then(() => {
       setDays(calculateSpots(appointments));
      });
    
  };
  
  const cancelInterview = (id) => {
    
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

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setDays(calculateSpots(appointments));
      });
  
  }
  
  return { state, setDay, bookInterview, cancelInterview };
};
