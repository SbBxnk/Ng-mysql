// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) {}
  
  isCollapsed = false;

  submitForm() {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login' ]);
  }
}
