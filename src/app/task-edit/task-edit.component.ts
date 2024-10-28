import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit{

  taskId: number;
  taskForm: FormGroup;
  users: User[] = [];

  constructor(private route: ActivatedRoute, private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder, private toastr: ToastrService, private router: Router) {

    const tid = this.route.snapshot.paramMap.get('id');
    this.taskId = Number(tid);

    this.taskForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: [''],
      assigneeId: [''],
    });

  }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })

    this.taskService.getTask(this.taskId).subscribe(data => {
      data.dueDate = new Date(data.dueDate).toISOString().slice(0, 10);
      this.taskForm.patchValue(data);
    }, (error) => {
      this.toastr.warning("Task is not found!: " + error.error.title);
    });

  }


  onSubmit() {
    const task = this.taskForm.value;

    task.id = this.taskId;

    this.taskService.updateTask(task, this.taskId).subscribe(data => {
        this.toastr.success("Task is updated successfully", "Success");
        this.router.navigate(['/tasks']);
    });
  }

  close() {

  }

}
