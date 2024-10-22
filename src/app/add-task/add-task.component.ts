import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {


  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService,
    private router: Router, private toastr: ToastrService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['Medium'],
    });
  }

  onSubmit() {
    let task = this.taskForm.value;
    this.taskService.createTask(task).subscribe(data => {
      this.toastr.success("Task is created successfully.", "Success");
      this.router.navigate(['/tasks'])
    })
  }

  close() {

  }

}
