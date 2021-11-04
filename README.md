# Interview Scheduler
Interview scheduler is a react application that allows users to book interviews/appointments with mentors for assistance. This is intended to mimic the lighthouse labs student-mentor appointment booking workflow. Appointments can be made between noon and 5 for each day of the week. 

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
Once the server is running, navigate to http://localhost:8000

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Database

This project connects to a postgress SQL database that is not included in this repository. An E2E cypress testbed was also completed for this project; however this testing suite relys on the same postgress database and has therefore not been included in this repository. Note: No appointment data will persist without the database connection. 

## Screen Shots
<img alt="Desktop view on page load" width="400" src="https://github.com/smalott16/scheduler/blob/master/docs/Screen%20Shot%202021-11-03%20at%208.22.59%20PM.png?raw=true"></img>

<p align="center">
Full page view of the application. From here, users can select their preferred appointment day and click on the + icon to start booking an available appointment. 
</p>
<br>

<img alt="Booking Form" width="400" src="https://github.com/smalott16/scheduler/blob/master/docs/Screen%20Shot%202021-11-03%20at%208.23.44%20PM.png?raw=true"></img>

<p align="center">
Once a user clicks + to to book an appointment, they are presented with this form to fill out. THe user enters their name and selects one of the available interviewers and clicks save. 
</p>
<br>

<img alt="Show Form" width="400" src="https://github.com/smalott16/scheduler/blob/master/docs/Screen%20Shot%202021-11-03%20at%208.34.55%20PM.png?raw=true"></img>

<p align="center">
Booked appointmentscan be edited or deleted by clicking on one of the icons in the lower right. 
</p>
<br>

<img alt="Delete warning" width="400" src="https://github.com/smalott16/scheduler/blob/master/docs/Screen%20Shot%202021-11-03%20at%208.24.33%20PM.png?raw=true"></img>

<p align="center">
Before a delete action takes place the user is prompted to confirm or cancel. 
</p>

## Dependencies
- Node (version 10.16.1)
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

### Dev Dependencies 
- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-do
- @testing-library/reac
- @testing-library/react-hook
- babel-loade
- node-sass
- prop-types
- react-test-renderer
