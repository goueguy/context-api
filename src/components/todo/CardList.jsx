import React, { useContext } from 'react'
import { TaskListContext } from '../../context/TaskListContext'
import Task from './Task';

export default function CardList() {
  const {tasks} = useContext(TaskListContext);
  return (
    <div className='row p-3 d-flex justify-content-between'>
       {
            tasks.sort((a,b)=>b.id-a.id).map(task=>(
              <Task task={task.task} completed={task.isCompleted} id={task.id} key={task.id}/>
            ))
        }
    </div>
  )
}
