import React, { useState } from "react";
import { useLogs, useLogsDispatch } from "./LogContext";
import "./LogList.css";
import { format } from "date-fns";
function compareLogs(a, b) {
  a = a.data.logDate.toDate();
  b = b.data.logDate.toDate();
  return a - b;
}
export function LogList() {
  const { logs } = useLogs();
  let sortedLogs = logs.sort(compareLogs);
  return (
    <ul style={{ listStyleType: "none" }}>
      {sortedLogs.map((log) => (
        <li key={log.id}>
          <Log log={log.data} />
        </li>
      ))}
    </ul>
  );
}

function Log({ log }) {
  //console.log(propData);

  const [meal, setMeal] = useState(log.description);
  const [calories, setCalories] = useState(log.calories);
  const [isNotEditing, setIsEditing] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the meal logging logic here, e.g., sending data to a server or updating state.
    console.log(`Logged meal: ${meal} - ${calories} calories`);
    setIsEditing(false); // Disable editing when meal is logged
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable editing
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <span
          type="button"
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          {format(log.logDate.toDate(), "hh:mm bb")}
        </span>
        <div className="card-body">
          <h5 className="card-title">{log.type} Log</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="meal" className="form-label">
                {log.type} Description
              </label>
              <input
                type="text"
                className="form-control"
                id="meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                required
                disabled={isNotEditing}
              />
            </div>
            {log.type == "Meal" && (
              <div className="mb-3">
                <label htmlFor="calories" className="form-label">
                  Calories
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                  disabled={isNotEditing}
                />
              </div>
            )}
            {isNotEditing ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Edit {log.type}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Save {log.type}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
