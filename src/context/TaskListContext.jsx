import React, { createContext, useEffect, useState } from "react"

export const TaskListContext = createContext()

const TaskListContextProvider = props =>{
    const taskData = JSON.parse(localStorage.getItem('tasks')) || [];
    const [tasks, setTask] = useState(taskData);
    const [editItem, setEditItem] = useState(null);

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])

    const addTask = task =>{
        setTask([...tasks,task]);
    }
    
    const deleteTask = id =>{
        setTask(tasks.filter(task=>task.id!=id));
    }
    
    const editTask = (task,id) =>{
        const newList = tasks.map(item=>(item.id===id) ? {...item,task:task} : item);
        setTask(newList)
        setEditItem(null)
    }

    const resetTask = ()=>{
        setTask([]);
    }

    const findItem = id =>{
        let item = tasks.find(task=>task.id==id);
        setEditItem(item);
    }
    const changeTaskStatus = (id)=>{
        const newStatus = tasks.map(item=>(item.id===id) ? {...item,isCompleted:!item.isCompleted}:item);
        setTask(newStatus);
    }

    const updateTask = (task,id,completed=null)=>{
        let newList = tasks.map((item)=>{
            if(item.id===id){
                if(completed==null){
                    return {
                        ...item,
                        task:task,
                        isCompleted:false
                    }
                }
                return {
                    ...item,
                    task:task,
                    isCompleted:!completed
                }
                
            }
            return item;
        });
        return newList;
    }
    return <TaskListContext.Provider value={{setEditItem,changeTaskStatus,findItem,editItem,deleteTask,addTask,tasks,editTask,resetTask}}>
        {props.children}
    </TaskListContext.Provider>
}

export default TaskListContextProvider;