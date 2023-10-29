// Homepage.js
import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendertile.css';
import { differenceInCalendarDays } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Header from './Header';
const datesToAddContentTo = [new Date(2023,9,13),];


function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
      return 'markedDate';
    }
  }
}
function Homepage() {
  let navigate= useNavigate();
  const [date, setDate] = useState(new Date());
  function onDateClick(value, event) {
   
    //alert('Clicked day: '+ value.toDateString())
    navigate("/datepage/"+value.valueOf());
 }
  return (
    <div>
      <Header/>
      <h1>Welcome to the Food Diary Homepage!</h1>
      {/* Add your homepage content here */}
      <Calendar 
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        onClickDay={onDateClick}
      />
    </div>
  );
}

export default Homepage;
