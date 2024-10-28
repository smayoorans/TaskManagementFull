import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { User } from '../models/models';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  users: User[] = [];

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService,
    private router: Router, private toastr: ToastrService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['Medium'],
      assigneeId: [''],
      checkLists: this.fb.array([])
    });
  }

  get myCheckLists(): FormArray {
    return this.taskForm.get('checkLists') as FormArray
  }

  addChecklist() {
    this.myCheckLists.push(this.fb.group({
      name: [''],
      isDone: [false]
    }))
  }

  removeChecklist(index: number) {
    this.myCheckLists.removeAt(index);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  onSubmit() {
    let task = this.taskForm.value;
    this.taskService.createTask(task).subscribe(data => {
      this.toastr.success("Task is created successfully.", "Success");
      this.router.navigate(['/tasks'])
    })
  }

  close() {
    this.router.navigate(['/tasks'])
  }

}
