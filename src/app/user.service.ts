import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('https://localhost:7008/api/Users');
  }

  createUser(user: User) {
    return this.http.post('https://localhost:7008/api/Users', user);
  }

  deleteUser(userId: number) {
    return this.http.delete('https://localhost:7008/api/Users/' + userId);
  }

  getUser(userId: number) {
    return this.http.get<User>('https://localhost:7008/api/Users/' + userId);
  }

  updateUser(user: User, userId: number) {
    return this.http.put('https://localhost:7008/api/Users/' + userId, user);
  }
}


export interface User {
  id: number;
  name:string;
  email: string;
  phone: string;
  password: string;
  address?: Address;
}

export interface Address {
  id: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
}
