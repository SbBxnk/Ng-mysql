import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000/api/'; 

  constructor(private http: HttpClient,
              private router: Router) { }

  loginUser(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.URL}login`, { email, password });
  }

  handleLogin(email: string, password: string): void {
    this.loginUser(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
