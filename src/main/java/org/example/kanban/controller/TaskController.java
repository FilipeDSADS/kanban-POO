package org.example.kanban.controller;

import org.example.kanban.model.Task;
import org.example.kanban.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks(@RequestParam(required = false) String priority,
                                   @RequestParam(required = false) LocalDateTime dueDate) {
        if (priority != null && dueDate != null) {
            return taskService.getAllTasks().stream()
                    .filter(task -> task.getPriority().equals(priority) && task.getDueDate().isBefore(dueDate))
                    .toList();
        } else if (priority != null) {
            return taskService.getAllTasks().stream()
                    .filter(task -> task.getPriority().equals(priority))
                    .toList();
        } else if (dueDate != null) {
            return taskService.getAllTasks().stream()
                    .filter(task -> task.getDueDate().isBefore(dueDate))
                    .toList();
        }
        return taskService.getAllTasks();
    }

    @PutMapping("/{id}/move")
    public ResponseEntity<Void> moveTask(@PathVariable Long id) {
        taskService.moveTask(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskService.updateTask(id, taskDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/report")
    public Map<String, List<Task>> generateReport() {
        List<Task> tasks = taskService.getAllTasks();
        Map<String, List<Task>> report = new HashMap<>();

        for (Task task : tasks) {
            if (!report.containsKey(task.getStatus())) {
                report.put(task.getStatus(), new ArrayList<>());
            }
            if ( task.getDueDate().isBefore(LocalDateTime.now()) && !task.getStatus().equals("Concluído")) {
                task.setDescription(task.getDescription() + " (ATRAZADA)");
            }
            report.get(task.getStatus()).add(task);
        }
        return report;
    }
}