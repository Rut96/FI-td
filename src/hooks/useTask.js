import { useRef, useState } from "react";


export function useTask() {
    const [tasks, setTasks] = useState([]);

    // for store state? between renders
    // const isFirstRender = useRef(true);

    function addTask(title, taskText) {
        const newTask = {
            id: Date.now().toString(),
            title,
            taskText,
            done: false,
            createdAt: Date.now()
        }

        setTasks([...tasks, newTask])
    }


    function deleteTask(id){
        const filtered = tasks.filter(t => t.id !== id);
        setTasks(filtered)
    }


    return {
        tasks,
        addTask,
        deleteTask
    }

}
