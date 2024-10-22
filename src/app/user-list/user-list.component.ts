import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  searchText = '';

  users: User[] = [];

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onDelete(userId: number) {
    if(confirm("Do you want to delete this user?")) {
      this.userService.deleteUser(userId).subscribe(data => {
        this.toastr.success("User is deleted successfully", "Deleted", {
          timeOut: 10000,
          closeButton: true,
        });
        this.loadUsers();
      })
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }


  onEdit(userId: number) {
    this.router.navigate(['/edit-user', userId]);
  }

}
