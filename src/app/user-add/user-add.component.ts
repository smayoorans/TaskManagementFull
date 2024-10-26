import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {

  userId: number = 0;
  userForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

    const uid = this.route.snapshot.paramMap.get('id');
    if (uid) {
      this.userId = Number(uid);
      this.isEditMode = true;
    }

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      phone: [''],
      password: [''],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['']
      })
    });
  }


  ngOnInit(): void {

    if (this.isEditMode) {
      this.userService.getUser(this.userId).subscribe(data => {
        this.userForm.patchValue(data);
      }, (error) => {
        this.toastr.warning("User is not found!: " + error.error.title);
      });
    }


  }

  onSubmit() {
    let user = this.userForm.value;

    if (this.isEditMode) {
      user.id = this.userId;
      this.userService.updateUser(user, this.userId).subscribe(data => {
        this.toastr.success("User is updated successfully.", "Success");
        this.router.navigate(['/users']);
      })
    } else {
      this.userService.createUser(user).subscribe(data => {
        this.toastr.success("User is created successfully.", "Success");
        this.router.navigate(['/users']);
      })
    }


  }

  close() {

  }


}
