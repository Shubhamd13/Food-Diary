import React from "react"
import "./AddLogsButton.css"


function AddLogsButton({handleLogType}){
	return (
		<div className="row">
		<ActionButton type="Meal" color="blue" handleLogType={handleLogType}/>
		<ActionButton type="Poo" color="lightbrown" handleLogType={handleLogType}/>
		<ActionButton type="Feel" color="lightpink" handleLogType={handleLogType}/>
		<ActionButton type="Meds" color="lightgrey" handleLogType={handleLogType}/>
		</div>
	)
}

export default AddLogsButton;

const ActionButton = ({ type, color,handleLogType }) => {
	const buttonClass = `btn btn-${color} btn-block`;
  
	return (
	  <div className="col-3 d-flex justify-content-center">
		<button className={buttonClass}
			onClick={()=>{handleLogType(type)}}
		>Add {type}</button>
	  </div>
	);
  };
