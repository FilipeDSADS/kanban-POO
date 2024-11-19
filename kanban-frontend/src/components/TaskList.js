import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, moveTask, deleteTask, setTaskToEdit }) => {
    const categories = {
        'A Fazer': [],
        'Em Progresso': [],
        'Concluído': []
    };

    const priorityOrder = {
        baixa: 1,
        média: 2,
        alta: 3
    };

    const sortedTasks = [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

    sortedTasks.forEach(task => {
        categories[task.status].push(task);
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Object.keys(categories).map(status => (
                <div key={status} style={{ flex: 1, margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <h2>{status}</h2>
                    <ul>
                        {categories[status].map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                moveTask={moveTask}
                                deleteTask={deleteTask}
                                setTaskToEdit={setTaskToEdit}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskList;