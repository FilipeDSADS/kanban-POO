import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskReport from './components/TaskReport';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showReport, setShowReport] = useState(false); // Estado para controlar a exibição do relatório

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:8080/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const createTask = async (newTask) => {
        try {
            const response = await axios.post('http://localhost:8080/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const editTask = async (id, updatedTask) => {
        try {
            await axios.put(`http://localhost:8080/tasks/${id}`, updatedTask);
            const updatedTasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
            setTasks(updatedTasks);
            setTaskToEdit(null);
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    const moveTask = async (id) => {
        try {
            await axios.put(`http://localhost:8080/tasks/${id}/move`);
            const updatedTasks = tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        status: task.status === "A Fazer" ? "Em Progresso" : "Concluído"
                    };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error moving task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
        const matchesDueDate = dueDate ? new Date(task.dueDate) <= new Date(dueDate) : true;
        return matchesPriority && matchesDueDate;
    });

    const handleReportToggle = () => {
        setShowReport(!showReport);
    };

    return (
        <div>
            <h1>Kanban</h1>
            <TaskForm createTask={createTask} editTask={editTask} taskToEdit={taskToEdit} />
            
            <div style={{ margin: '20px 0' }}>
                <label>
                    Filtrar por Prioridade:
                    <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                        <option value="">Todas</option>
                        <option value="baixa">Baixa</option>
                        <option value="média">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </label>
                <label style={{ marginLeft: '10px' }}>
                    Data Limite:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>
            </div>

            <button onClick={handleReportToggle}>
                {showReport ? 'Ocultar Relatório' : 'Gerar Relatório'}
            </button>

            {showReport && <TaskReport tasks={filteredTasks} />}

            <TaskList tasks={filteredTasks} moveTask={moveTask} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
        </div>
    );
};

export default App;