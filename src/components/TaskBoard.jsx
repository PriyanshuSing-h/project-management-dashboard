import React from 'react';
import { useProject } from '../context/ProjectContext';
import TaskCard from './TaskCard';

export default function KanbanBoard() {
  // Handle task creation and update global state
  const { state, dispatch } = useProject();
  const activeProject = state.projects.find(p => p.id === state.activeProjectId);

  if (!activeProject) return <div className="p-10">Select a project</div>;

  const columns = ['To Do', 'In Progress', 'DONE'];

  // Calculate Progress
  const totalTasks = activeProject.tasks.length;
  const completedTasks = activeProject.tasks.filter(t => t.status === 'DONE').length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 2. This is the new function that handles adding a task
  const handleAddTask = () => {
    const title = window.prompt("Enter the new task title:");
    if (!title) return; // Stop if they hit cancel or leave it blank
    
    const assignee = window.prompt("Who is assigned to this task?", "Unassigned");
    
    const newTask = {
      id: `t${Date.now()}`, // Quick unique ID generator
      title: title,
      assignee: assignee || "Unassigned",
      deadline: new Date().toISOString().split('T')[0], // Today's date
      status: 'To Do' // Always starts in the To Do column
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div className="flex-1 p-8 overflow-x-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{activeProject.name}</h2>
          <div className="mt-2 flex items-center space-x-4">
            <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{progress}% Complete</span>
          </div>
        </div>
        {/*  connected the function to the button's onClick event */}
        <button 
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer"
        >
          + New Task
        </button>
      </div>

      <div className="flex space-x-6">
        {columns.map(col => (
          <div key={col} className="bg-gray-100 rounded-lg w-80 flex-shrink-0 flex flex-col max-h-[75vh]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-gray-700">{col}</h3>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {activeProject.tasks.filter(t => t.status === col).length}
              </span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {activeProject.tasks
                .filter(t => t.status === col)
                .map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}