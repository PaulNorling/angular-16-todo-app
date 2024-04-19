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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.revel-health.com/channel-service/voice/callflow/dfad1f5a-4c32-4dd8-af6f-613ec78e3e13').subscribe(data => {
      console.log(data); // Process the received data
    });
  }
}
