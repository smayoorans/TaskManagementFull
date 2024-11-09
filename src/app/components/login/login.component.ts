import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  login: LoginRequest;

  constructor(private userService: UserService, private router: Router) {
    this.login = { email : '', password: ''};
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.login(this.login).subscribe(data => {
        this.router.navigate(['/admin/tasks']);
    });
  }
}




export interface LoginRequest {
  email: string;
  password: string;
}
