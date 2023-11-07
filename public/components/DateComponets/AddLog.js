import React, { useState,useRef } from "react";
import { useLogs } from "./LogContext";
import AddLogsButton from "./AddLogsButton";
import { differenceInCalendarDays } from "date-fns";
import { Timestamp } from 'firebase/firestore';


function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

export function AddLog({ selectedDate }) {
  const [showForm, setShowForm] = useState(true);
  const [logType, setLogType] = useState("Meal");
  const { addLog } = useLogs();
	const isSameDaySelected = isSameDay(selectedDate, new Date());
	const inputRefs = useRef({
    description: null,
    calories: null,
		time: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
		console.log(inputRefs.current)
		const description = inputRefs.current.description?.value;
		const calories = inputRefs.current.calories?.value;
		const time = inputRefs.current.time?.value;
		let logDate = null;
    let log = {};
		if(isSameDaySelected){
			logDate = new Date();
		}else{
      logDate = selectedDate;
      const splittedTime = time.split(":");
			logDate.setHours(splittedTime[0],splittedTime[1]);
    }
    log.type = logType;
    log.description = description;
    log.logDate = Timestamp.fromDate(logDate);
    // Handle the logging logic here, e.g., sending data to a server or updating state.
		switch(logType){
			case "Meal":
        log.calories = calories;
				break;
			case"Poo":
				break;
			case "Feel":
				break;
			case "Meds":
				break;
			default:
				console.log("Error at AddLogs");
		}
		addLog(log);
  };
  
  const handleLogType = (newLogtype) => {
    setLogType(newLogtype);
    setShowForm(true);
  };

  return (
    <>
      <AddLogsButton handleLogType={handleLogType} />
      {showForm && (
        <div className="container mt-4">
          <div className="card position-relative">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowForm(false)}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            ></button>

            <div className="card-body">
              <h5 className="card-title">Log Your {logType}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    {logType} Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
										placeholder="Description"
										ref={(input) => (inputRefs.current.description = input)}
                    required
                  />
                </div>
								{logType=="Meal" &&(
									<div className="mb-3">
                  <label htmlFor="calories" className="form-label">
                    Calories
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="calories"
										ref={(input) => (inputRefs.current.calories = input)}
                    required
                  />
                </div>
								)}
                
                {!isSameDaySelected && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="time" className="form-label">
                        Log time
                      </label>
                      <input 
					  						type="time" 
												className="form-control" 
												id="time" 
												ref={(input) => (inputRefs.current.time = input)}
										/>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Log {logType}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
