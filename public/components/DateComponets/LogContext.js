import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import { db } from "../../firebase";
import { collection, getDocs, query, addDoc, where } from "firebase/firestore";
import { format, add } from "date-fns";

export const LogsContext = createContext(null);
export const LogsDispatchContext = createContext(null);

export function LogsProvider({ children, selectedDate }) {
  const { user } = useAuth();
  const [logs, dispatch] = useReducer(logsReducer, []);

  useEffect(() => {
    getUsers();
  }, [selectedDate]);

  const addLog = async (log) => {
    const docRef = await addDoc(collection(db, "users", user.uid, "logs"), log);
    dispatch({
      type: "added",
      payload: { id:docRef.id , data:{...log}},
    });
  }
  const getUsers = async () => {
      //const q = query(collection(db, "users"), where("capital", "==", true));
      //const docRef = doc(db, "cities", "SF");
      //const docSnap = await getDoc(docRef);
      const logList = [];
      const userLogsRef = collection(db, "users", user.uid, "logs");
      const q = query(
        userLogsRef,
        where("logDate", ">=", selectedDate),
        where("logDate", "<", add(selectedDate, { days: +1 }))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const log = doc.data();
        logList.push({ id: doc.id, data: doc.data() });
        for (const aProperty in log) {
          // do what needed
          // in case you want just to print it:
          console.log(aProperty + " has value: " + log[aProperty]);
        }
      });
      dispatch({
        type: "intialize",
        payload: logList,
      });
  }
  const contextData = {
    logs,
    addLog,
  }


  return (
    <LogsContext.Provider value={contextData}>
      <LogsDispatchContext.Provider value={dispatch}>
        {children}
      </LogsDispatchContext.Provider>
    </LogsContext.Provider>
  );
}
//Custom Hooks
export function useLogs() {
  return useContext(LogsContext);
}

export function useLogsDispatch() {
  return useContext(LogsDispatchContext);
}

function logsReducer(logs, action) {
  switch (action.type) {
    case "added": {
      return [
        ...logs,
        action.payload,
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.logs.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return logs.filter((t) => t.id !== action.id);
    }
    case "intialize": {
      return action.payload;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

