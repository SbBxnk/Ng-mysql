import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NzInputModule, ReactiveFormsModule, NzFormModule, NzCheckboxModule, NzButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.userService.loginUser(userName, password).subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('authToken', token);
          this.router.navigate(['/empList']);
        },
        error => {
          console.error('Login failed', error);
        }
      )
    }
  }
}
