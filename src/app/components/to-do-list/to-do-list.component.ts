import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log("to-do-list-component", data);
      },
      error: (e) => console.error(e)
    });
  }

  addTask(): void {
    if (!this.newTask.trim()) { // Check if newTask is empty or only whitespace
      return;
    }

    const data = {
      task: this.newTask,
      complete: false
    };

    this.taskService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.newTask = '';
        this.retrieveTasks();
      },
      error: (e) => console.error(e)
    });
  }

  deleteTask(task: Task): void {
    console.log("delete", task);
    this.taskService.delete(task.id).subscribe({
      next: () => {
        this.retrieveTasks();
      },
      error: (e) => console.error(e)
    });
  }

  updateTask(task: Task): void {
    console.log("updateTask", task);
    this.taskService.update(task.id, task).subscribe({
      next: () => {
        this.retrieveTasks();
      },
      error: (e) => console.error(e)
    });
  }
}
