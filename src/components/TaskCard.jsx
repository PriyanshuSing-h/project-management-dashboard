import React from 'react';
import { useProject } from '../context/ProjectContext';

export default function TaskCard({ task }) {
  const { dispatch } = useProject();

  const handleStatusChange = (e) => {
    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { taskId: task.id, newStatus: e.target.value }
    });
  };

  const handleDeleteTask = () => {
    if (window.confirm("Delete this task?")) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border border-gray-200 hover:shadow-md transition relative group">
      
      {/* Delete Button (visible on hover) */}
      <button 
        onClick={handleDeleteTask}
        className="absolute top-2 right-2 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
        title="Delete Task"
      >
        ✕
      </button>

      <h4 className="font-medium text-gray-800 mb-2 pr-4">{task.title}</h4>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold" title={`Assignee: ${task.assignee}`}>
            {task.assignee.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-500">{task.deadline}</span>
        </div>
        
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className="text-xs bg-gray-50 border border-gray-300 rounded px-1 py-1 text-gray-600 outline-none cursor-pointer"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
    </div>
  );
}