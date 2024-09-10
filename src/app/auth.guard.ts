import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken'); // ตรวจสอบว่ามี token อยู่ใน localStorage หรือไม่
    if (!isLoggedIn) {
      this.router.navigate(['/login' ]); // ถ้ายังไม่ได้ล็อกอิน Redirect ไปที่หน้า Login
      return false;
    }
    return true;
  }
}
