import React, { useState } from "react";
import { useLogs } from "./LogContext";

export function AddLog() {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const {addLog} = useLogs();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the meal logging logic here, e.g., sending data to a server or updating state.
    console.log(`Logged meal: ${meal} - ${calories} calories`);
	addLog( { name: meal, calories: calories, type: "meal" });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Log Your Meal</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="meal" className="form-label">
                Meal Name
              </label>
              <input
                type="text"
                className="form-control"
                id="meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                required
              />
            </div>
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
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Log Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
