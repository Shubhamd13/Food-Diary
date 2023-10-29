import React, { useState,useEffect  } from "react";
import { useParams } from "react-router-dom";
import { format,add } from 'date-fns';
import MealLog from "./MealLog";
import { useAuth } from "../../utils/AuthContext";
import { db } from "../../firebase";
import { collection, getDocs,query,where } from "firebase/firestore"; 
import DatePicker from "./DatePicker";



function DatePage() {
  const {user} = useAuth();
  const [mealListItems,setMealListItems]  =useState([]);
  const { passedDate } = useParams();
  const formatedDate = new Date(Number(passedDate));
  const [selectedDate,setSelectedDate]  =useState(formatedDate);
  function handleDateChange(durationToAdd){
    setSelectedDate(add(selectedDate,durationToAdd))
  }
  console.log(selectedDate);

  useEffect( () => {
    async function getUsers(){
      //const q = query(collection(db, "users"), where("capital", "==", true));
      //const docRef = doc(db, "cities", "SF");
      //const docSnap = await getDoc(docRef);
      const mealList=[];
      const userLogsRef=collection(db, "users",user.uid,"logs");
      const q = query(userLogsRef,where("logDate", ">=", selectedDate),where("logDate", "<",add(selectedDate,{days:+1})));
      const querySnapshot = await getDocs(q );
      querySnapshot.forEach((doc) => {
        const log=doc.data();
        mealList.push({id:doc.id,data:doc.data()});
        for (const aProperty in log) {
          // do what needed
          // in case you want just to print it:
          console.log(aProperty + " has value: " + log[aProperty]);
        }
      });
      setMealListItems([...mealList]);
    }
    getUsers();
  }, [selectedDate]);

  
  return (
    <div className="container ">
    <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange}/>
      <ul style={{listStyleType:"none"}}>
        {
          mealListItems.map((mealLog)=>
          <li key={mealLog.id}><MealLog mealLog={mealLog.data}/></li>
          )
        }
      </ul>
      
    
    </div>
  );
}
export default DatePage;
