import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskList from './TaskList'
import { TaskListContext } from '../../context/TaskListContext';

export default function TaskForm() {
  const {setEditItem,addTask,tasks,resetTask,editTask,editItem,changeTaskStatus} = useContext(TaskListContext);
  const [title, setTitle] = useState("");
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!editItem){
        addTask({
            id:tasks.length+1,
            task:title,
            isCompleted:false
        })
        setTitle("")
    }else{
        editTask(title,editItem.id)
    }
  }
  const handleReset = (e)=>{
    e.preventDefault();
    resetTask()
  }
  const initializeInput = (e)=>{
    e.preventDefault();
    setTitle("")
    setEditItem(null)
  }
  useEffect(()=>{
    if(editItem){
        setTitle(editItem.task)
    }else{
        setTitle("")
    }
  },[editItem])

  const handleChange = (e)=>{
    setTitle(e.target.value)
  }
  return (
    <div>
        <form onSubmit={handleSubmit} className='form'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <input type="text" name="task" value={title} onChange={handleChange} className="form-control border-radius" placeholder='Entrer une todo'/>
                    </div>
                </div>
                <div className='col-lg-8 offset-lg-2 d-flex justify-content-center'>
                    <div className="mt-3 col-lg-6">
                        <button className='btn btn-orange btn-block' type='button' onClick={initializeInput}>Reset Form</button>
                    </div>
                    <div className="mt-3 col-lg-6">
                        <button className='btn btn-orange btn-block' type='submit'>{editItem!=null ? "Edit Task":"Add Task"}</button>
                    </div>
                    <div className="mt-3 col-lg-6">
                        <button className='btn btn-orange btn-block' onClick={handleReset}>Clear List</button>
                    </div>
                </div>
            </div>
        </form>
        <div className='list'>
            <TaskList/>
        </div>
    </div>
  )
}
