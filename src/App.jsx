import "./App.css";
import React from 'react'
import TaskManager from "./components/taskManager";
import Auth from "./components/auth";

const App = () => {
  return (
    <div>
      <TaskManager />
      <Auth />
    </div>
  )
}

export default App;


