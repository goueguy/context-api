
import React from 'react'
import './App.css'
import TaskForm from './components/todo/TaskForm'
import TaskListContextProvider from './context/TaskListContext'




function App() {
  return (
    <TaskListContextProvider>
      <div className='todoForm'>
        <TaskForm/>
      </div>
    </TaskListContextProvider>
  )
}

export default App
