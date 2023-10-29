import React from "react";
import { format } from 'date-fns';
import "react-calendar/dist/Calendar.css";

function DatePicker({selectedDate,handleDateChange}){
	return(
		<div className="react-calendar__navigation">
      <button
        aria-label=""
        className="react-calendar__navigation__arrow react-calendar__navigation__prev2-button"
        type="button"
        onClick={()=>handleDateChange({months:-1})}

      >
        «
      </button>
      <button
        aria-label=""
        className="react-calendar__navigation__arrow react-calendar__navigation__prev-button"
        type="button"
        onClick={()=> handleDateChange({days:-1})}
      >
        ‹
      </button>
      <button
        aria-label=""
        className="react-calendar__navigation__label"
        type="button"
        style={{ flexGrow: 1 }}
      >
        <span className="react-calendar__navigation__label__labelText react-calendar__navigation__label__labelText--from">
          {format(selectedDate,"do MMM yyyy")} 
        </span>
      </button>
      <button
        aria-label=""
        className="react-calendar__navigation__arrow react-calendar__navigation__next-button"
        type="button"
        onClick={()=> handleDateChange({days:1})}
      >
        ›
      </button>
      <button
        aria-label=""
        className="react-calendar__navigation__arrow react-calendar__navigation__next2-button"
        type="button"
        onClick={()=> handleDateChange({months:-1})}

      >
        »
      </button>
      </div>
	)
}
export default DatePicker;