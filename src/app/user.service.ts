import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://localhost:7048/api/Users';

  constructor(private http: HttpClient) { }

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



