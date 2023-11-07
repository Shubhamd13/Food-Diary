import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { add } from "date-fns";
import DatePicker from "./DatePicker";
import { LogsProvider } from "./LogContext";
import { AddLog } from "./AddLog";
import { LogList } from "./LogList";

function DatePage() {
  const { passedDate } = useParams();
  const formatedDate = new Date(Number(passedDate));
  const [selectedDate, setSelectedDate] = useState(formatedDate);
  function handleDateChange(durationToAdd) {
    let newDate = add(selectedDate, durationToAdd);
    if (newDate <= new Date()) setSelectedDate(newDate);
  }
  console.log(selectedDate);

  return (
    <div className="container">
      <DatePicker
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <LogsProvider selectedDate={selectedDate}>
        <AddLog selectedDate={selectedDate} />
        <LogList />
      </LogsProvider>
    </div>
  );
}
export default DatePage;
