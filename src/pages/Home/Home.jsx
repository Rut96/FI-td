import { useEffect, useState } from 'react';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { TDCard } from '../../components/TDCard/TDCard';
import { TDForm } from '../../components/TDForm/TDForm';
import { useTaskCrud } from '../../hooks/useTaskCrud';
import './Home.css';

export function Home() {

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [filteredTasks, setFilteredTasks] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const { addTask, deleteTask, toggleTask, updateTask } = useTaskCrud(setTasks);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
        let filtered;
        switch (activeFilter) {
            case 'done':
                filtered = tasks.filter(task => task.done === true);
                break;
            case 'nDone':
                filtered = tasks.filter(task => task.done === false);
                break;
            case 'all':
            default:
                filtered = [...tasks];
                break;
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(term) ||
                task.text.toLowerCase().includes(term)
            );
        }

        setFilteredTasks(filtered);
    }, [tasks, activeFilter, searchTerm]);

    // crud - load to hook
    // function addTask(title, text) {
    //     const newTask = {
    //         id: Date.now().toString(),
    //         title,
    //         text,
    //         done: false,
    //         createdAt: Date.now()
    //     }
    //     setTasks(prevTasks => [...prevTasks, newTask])
    // }

    // function deleteTask(taskId) {
    //     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    // }

    // function toggleTask(taskId) {
    //     setTasks(prevTasks =>
    //         prevTasks.map(task => task.id === taskId
    //             ? { ...task, done: !task.done }
    //             : task
    //         )
    //     );
    // }

    // function updateTask(taskId, updatedData) {
    //     setTasks(prevTasks =>
    //         prevTasks.map(task => task.id === taskId
    //             ? { ...task, ...updatedData, updatedAt: Date.now() }
    //             : task
    //         )
    //     );
    // }

    function applyFilter(filterType) {
        setActiveFilter(filterType);
    }

    function handleSearch(term) {
        setSearchTerm(term)
    }

    const displayTasks = (activeFilter !== 'all' || searchTerm.trim() !== '')
        ? filteredTasks
        : tasks;

    return (
        <div className="Home">
            <div className="todo-form">
                <TDForm addTask={addTask} />
                <SearchBar searchTasks={handleSearch} />
                <FilterBar filterTasks={applyFilter} />
            </div>


            <div className="todo-container">
                {displayTasks && displayTasks.length > 0 ? (
                    displayTasks.map(t => (
                        <TDCard
                            key={t.id}
                            props={t}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))
                ) : (
                    <div className="no-tasks">
                        {activeFilter !== 'all'
                            ? `No ${activeFilter === 'done' ? 'completed' : 'pending'} tasks found`
                            : "No tasks yet. Add one above!"}
                    </div>
                )}
            </div>
        </div>
    );
}