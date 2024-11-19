import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('baixa'); // Definindo um valor padrão

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = {
                title,
                description,
                priority,
            };
            await axios.post('http://localhost:8080/tasks', newTask);
            fetchTasks();
            setTitle('');
            setDescription('');
            setPriority('baixa');
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
            </select>
            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
};

export default AddTask;