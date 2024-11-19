import React, { useState, useEffect } from 'react';

const TaskForm = ({ createTask, editTask, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('baixa');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setPriority(taskToEdit.priority);
            setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().slice(0, 16) : '');
        } else {
            setTitle('');
            setDescription('');
            setPriority('baixa');
            setDueDate('');
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title: title.trim(),
            description: description.trim() === '' ? undefined : description,
            priority,
            dueDate: dueDate.trim() === '' ? undefined : new Date(dueDate).toISOString(),
            status: 'A Fazer'
        };

        try {
            if (taskToEdit) {
                await editTask(taskToEdit.id, newTask); 
            } else {
                await createTask(newTask);
            }
        } catch (error) {
            console.error('Erro ao criar/editar tarefa:', error);
        }

        setTitle('');
        setDescription('');
        setPriority('baixa');
        setDueDate('');
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
                placeholder="Descrição (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="baixa">Baixa</option>
                <option value="média">Média</option>
                <option value="alta">Alta</option>
            </select>
            <button type="submit">{taskToEdit ? 'Editar Tarefa' : 'Criar Tarefa'}</button>
        </form>
    );
};

export default TaskForm;