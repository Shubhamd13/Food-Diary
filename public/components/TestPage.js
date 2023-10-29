import React, { useState,useEffect, useMemo  } from "react";
import { format,add } from 'date-fns';


function TestPage(){
	const [selectedDate,setSelectedDate]  =useState(new Date());
	useEffect( () => {
		console.log("Use effect hook triggered", selectedDate);
	},[selectedDate])
	function handleClick(daysToAdd){
		setSelectedDate(add(selectedDate,{days:daysToAdd}))
	}
	return(
		<>
		<button onClick={()=>handleClick(-1)}>
			-Date
		</button>
		{format(selectedDate,"do MMM yyyy")}
		<button onClick={()=>handleClick(1)}>
			+Date
		</button>
		</>
	)
	
}
export default TestPage;