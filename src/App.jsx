import React from 'react';
import { ProjectProvider } from './context/ProjectContext';
import Sidebar from './components/Sidebar';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <ProjectProvider>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <TaskBoard />
      </div>
    </ProjectProvider>
  );
}

export default App;