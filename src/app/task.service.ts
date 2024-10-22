import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>('https://localhost:7008/api/TaskItems');
  }

  createTask(task: Task) {
    return this.http.post('https://localhost:7008/api/TaskItems', task);
  }

  deleteTask(taskId: number) {
    return this.http.delete('https://localhost:7008/api/TaskItems/' + taskId);
  }

  getTask(taskId: number) {
    return this.http.get<Task>('https://localhost:7008/api/TaskItems/' + taskId);
  }

  updateTask(task: Task, taskId: number) {
    return this.http.put('https://localhost:7008/api/TaskItems/' + taskId, task);
  }

}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}
