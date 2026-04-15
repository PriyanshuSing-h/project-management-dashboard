import React, { createContext, useReducer, useContext, useEffect } from 'react';

//  This is our fallback data if local storage is completely empty
const fallbackInitialState = {
  projects: [
    {
      id: 'p1',
      name: 'Food Delivery App',
      tasks: [
        { id: 't1', title: 'Resolve Swiggy API CORS issues', assignee: 'Priyanshu', deadline: '2026-05-01', status: 'To Do' },
        { id: 't2', title: 'Setup Redux global state.', assignee: 'Priyanshu', deadline: '2026-05-05', status: 'In Progress' },
      ]
    }
  ],
  activeProjectId: 'p1'
};


function projectReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_PROJECT':
      return { ...state, activeProjectId: action.payload };
    
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        activeProjectId: action.payload.id
      };

    case 'DELETE_PROJECT':
      const remainingProjects = state.projects.filter(p => p.id !== action.payload);
      return {
        ...state,
        projects: remainingProjects,
        activeProjectId: state.activeProjectId === action.payload 
          ? (remainingProjects.length > 0 ? remainingProjects[0].id : null) 
          : state.activeProjectId
      };

    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === state.activeProjectId 
            ? { ...p, tasks: [...p.tasks, action.payload] } 
            : p
        )
      };

    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === state.activeProjectId 
            ? {
                ...p,
                tasks: p.tasks.map(t => 
                  t.id === action.payload.taskId ? { ...t, status: action.payload.newStatus } : t
                )
              }
            : p
        )
      };

    case 'DELETE_TASK':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === state.activeProjectId
            ? { ...p, tasks: p.tasks.filter(t => t.id !== action.payload) }
            : p
        )
      };

    default:
      return state;
  }
}

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  //  Checking local storage BEFORE using the fallback state
  const [state, dispatch] = useReducer(projectReducer, fallbackInitialState, (initial) => {
    try {
      const localData = localStorage.getItem('devdash_data');
      return localData ? JSON.parse(localData) : initial;
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return initial;
    }
  });

  //  Save to local storage every time the state changes
  useEffect(() => {
    localStorage.setItem('devdash_data', JSON.stringify(state));
  }, [state]);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);