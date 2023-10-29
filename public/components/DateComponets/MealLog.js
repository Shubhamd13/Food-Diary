import React, { useState } from 'react';

function MealLog(props) {
  const mealData= props.mealLog;
  //console.log(propData);

  const [meal, setMeal] = useState(mealData.name);
  const [calories, setCalories] = useState(mealData.calories);
  const [isEditing, setIsEditing] = useState(true);

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
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Log Meal
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MealLog;
