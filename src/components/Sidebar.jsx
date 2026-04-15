import React from 'react';
import { useProject } from '../context/ProjectContext';

export default function Sidebar() {
  const { state, dispatch } = useProject();

  const handleAddProject = () => {
    const projectName = window.prompt("Enter new project name:");
    if (!projectName) return;

    const newProject = {
      id: `p${Date.now()}`,
      name: projectName,
      tasks: []
    };

    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const handleDeleteProject = (e, projectId) => {
    e.stopPropagation(); // Prevents the click from selecting the project
    if (window.confirm("Are you sure you want to delete this project? All tasks will be lost.")) {
      dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 tracking-wide">Project Manager</h1>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm text-gray-400 uppercase tracking-wider">Your Projects</h2>
        <button 
          onClick={handleAddProject}
          className="text-gray-400 hover:text-white font-bold text-xl leading-none"
          title="Add New Project"
        >
          +
        </button>
      </div>

      <ul className="space-y-2 flex-1 overflow-y-auto">
        {state.projects.map(project => (
          <li 
            key={project.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_PROJECT', payload: project.id })}
            className={`p-3 rounded-md cursor-pointer transition-colors flex justify-between items-center group ${
              state.activeProjectId === project.id ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <span className="truncate pr-2">{project.name}</span>
            <button 
              onClick={(e) => handleDeleteProject(e, project.id)}
              className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
              title="Delete Project"
            >
              ✕
            </button>
          </li>
        ))}
        {state.projects.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-4">No projects yet. Create one!</p>
        )}
      </ul>
    </div>
  );
}