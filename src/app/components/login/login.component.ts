import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login: LoginRequest;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.login = { email: '', password: '' };
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.login(this.login).subscribe(data => {

      localStorage.setItem("Token", data);

      const userDetails: any = jwtDecode(data);

      localStorage.setItem("Name", userDetails.Name);

      this.router.navigate(['/admin/tasks']);
    }, error => {
      this.toastr.error(error.error);
    });
  }
}




export interface LoginRequest {
  email: string;
  password: string;
}
