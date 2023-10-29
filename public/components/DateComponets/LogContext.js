import { createContext } from 'react';

export const LogsContext = createContext(null);
export const LogsDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [logs, dispatch] = useReducer(
    logsReducer,
    []
  );

  return (
    <LogsContext.Provider value={logs}>
      <LogsDispatchContext.Provider value={dispatch}>
        {children}
      </LogsDispatchContext.Provider>
    </LogsContext.Provider>
  );
}

function logsReducer(logs, action) {
  switch (action.type) {
    case 'added': {
      return [...logs, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.logs.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return logs.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}