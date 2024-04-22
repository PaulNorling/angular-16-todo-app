import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  task?: Task[];
  newTask: string = '';

  constructor(
    // private http: HttpClient,
    private taskService: TaskService) { }

  // ngOnInit(): void {
  //   this.http.get('http://localhost:3000/tasks').subscribe(data => {
  //     console.log("to-do-list-component", data); // Process the received data
  //   });
  // }
  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.task = data;
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
    console.log(data, "In add task");
    this.taskService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.newTask = '';
      this.retrieveTasks();
      },
      error: (e) => console.error(e)
    });
  }
}
