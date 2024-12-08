import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {

  name = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.name = localStorage.getItem("Name") || '';
  }

  logout(){
    localStorage.removeItem("Token");
    this.router.navigate(['/login'])
  }
}
