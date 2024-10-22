import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {

  searchText = '';

  tasks: Task[] = [];

  constructor(private taskService: TaskService,
    private toastr: ToastrService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.loadTasks();
  }

  onDelete(taskId: number) {
    if(confirm("Do you want to delete this task?")) {
      this.taskService.deleteTask(taskId).subscribe(data => {
        this.toastr.success("Task is deleted successfully", "Deleted", {
          timeOut: 10000,
          closeButton: true,
        });
        this.loadTasks();
      })
    }
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }


  onEdit(taskId: number) {
    this.router.navigate(['/edit-task', taskId]);
  }

}
