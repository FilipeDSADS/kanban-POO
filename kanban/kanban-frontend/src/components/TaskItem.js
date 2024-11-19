import React from 'react';

const TaskItem = ({ task, moveTask, deleteTask, setTaskToEdit }) => {
    const priorityColors = {
        baixa: 'green',
        média: 'orange',
        alta: 'red'
    };

    return (
        <li style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px', borderRadius: '5px' }}>
            <h4 style={{ color: priorityColors[task.priority] }}>{task.title}</h4> {}
            <p>{task.description}</p>
            <p><strong>Prioridade:</strong> <span style={{ color: priorityColors[task.priority] }}>{task.priority}</span></p>
            {task.dueDate && <p><strong>Data Limite:</strong> {new Date(task.dueDate).toLocaleString()}</p>}
            <button onClick={() => moveTask(task.id)}>Mover</button>
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
            <button onClick={() => setTaskToEdit(task)}>Editar</button>
        </li>
    );
};

export default TaskItem;