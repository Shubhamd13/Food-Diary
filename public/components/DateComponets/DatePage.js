import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { add } from "date-fns";
import { useAuth } from "../../utils/AuthContext";
import DatePicker from "./DatePicker";
import { LogsProvider } from "./LogContext";
import { AddLog } from "./AddLog";
import { LogList } from "./LogList";

function DatePage() {
  const { user } = useAuth();
  const [mealListItems, setMealListItems] = useState([]);
  const { passedDate } = useParams();
  const formatedDate = new Date(Number(passedDate));
  const [selectedDate, setSelectedDate] = useState(formatedDate);
  function handleDateChange(durationToAdd) {
    setSelectedDate(add(selectedDate, durationToAdd));
  }
  console.log(selectedDate);

  return (
    <div className="container ">
      <DatePicker
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <LogsProvider selectedDate={selectedDate}>
        <AddLog />
        <LogList />
      </LogsProvider>
    </div>
  );
}
export default DatePage;
