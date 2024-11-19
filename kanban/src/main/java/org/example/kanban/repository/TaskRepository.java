package org.example.kanban.repository;

import org.example.kanban.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByPriority(String priority);
    List<Task> findByDueDateBefore(LocalDateTime dueDate);
    List<Task> findByPriorityAndDueDateBefore(String priority, LocalDateTime dueDate);
}