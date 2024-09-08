// src/app/service/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000/api/'
  constructor(private http:HttpClient) { }

  // Login user
  LoginUser(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.URL}login`, { email, password });
  }


}

