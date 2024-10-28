import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Task } from '../models/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {

  searchText = '';

  tasks: Task[] = [];

  modalRef?: BsModalRef;

  taskId = 0;

  constructor(private taskService: TaskService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService
  ) {

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

  openModal(template: TemplateRef<void>, taskId: number) {
    this.taskId = taskId;
    this.modalRef = this.modalService.show(template);
  }

  confirm() {
    this.modalRef?.hide();
    this.taskService.deleteTask(this.taskId).subscribe(data => {
      this.toastr.success("Task is deleted successfully", "Deleted", {
        timeOut: 10000,
        closeButton: true,
      });
      this.loadTasks();
    })
  }

  decline() {
    this.modalRef?.hide();
  }

}
