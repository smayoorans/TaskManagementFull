import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/models';
import { LoginRequest } from './components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://localhost:7008/api/Users';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest) {
    return this.http.post(this.url + '/login', loginRequest, {
      responseType: 'text'
    });
  }

  isLoggedIn() {
    if(localStorage.getItem("Token")) {
      return true;
    } else {
      return false;
    }
  }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  createUser(user: User) {
    return this.http.post(this.url, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.url + '/' + userId);
  }

  getUser(userId: number) {
    return this.http.get<User>(this.url + '/' + userId);
  }

  updateUser(user: User, userId: number) {
    return this.http.put(this.url + '/' + userId, user);
  }

}



