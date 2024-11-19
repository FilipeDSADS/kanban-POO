import React from 'react';

const TaskReport = ({ tasks }) => {
    const currentDate = new Date();

    return (
        <div>
            <h2>Relatório de Tarefas</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {['A Fazer', 'Em Progresso', 'Concluído'].map(status => (
                    <div key={status} style={{ flex: 1, margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <h3>{status}</h3>
                        <ul>
                            {tasks
                                .filter(task => task.status === status)
                                .map(task => {
                                    const isOverdue = task.dueDate && new Date(task.dueDate) < currentDate && task.status !== 'Concluído';
                                    return (
                                        <li key={task.id} style={{ color: isOverdue ? 'red' : 'black', fontWeight: isOverdue ? 'bold' : 'normal' }}>
                                            <h4>{task.title}</h4>
                                            <p>{task.description}</p>
                                            {task.dueDate && <p><strong>Data Limite:</strong> {new Date(task.dueDate).toLocaleString()}</p>}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskReport;