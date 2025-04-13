import { useCallback } from 'react';

export function useTaskCrud(setTasks) {
    // useCallback - prevent unnecessary re-render
    const addTask = useCallback((title, text) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            text,
            done: false,
            createdAt: Date.now()
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
    }, [setTasks]);

    const deleteTask = useCallback((taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, [setTasks]);

    const toggleTask = useCallback((taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === taskId
                ? { ...task, done: !task.done }
                : task
            )
        );
    }, [setTasks]);

    const updateTask = useCallback((taskId, updatedData) => {
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === taskId
                ? { ...task, ...updatedData, updatedAt: Date.now() }
                : task
            )
        );
    }, [setTasks]);

    return {
        addTask,
        deleteTask,
        toggleTask,
        updateTask
    };
}